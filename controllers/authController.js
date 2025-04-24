const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN + 'd'
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    res.cookie('jwt', token, cookieOptions);

    user.hashedPassword = undefined;

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            
            const result = await db.query('SELECT * FROM app_user WHERE id = $1', [decoded.id]);
            const freshUser = result.rows[0];
            
            if (!freshUser) return next();
            
            res.locals.user = freshUser;
            
            return next();
        } catch (err) {
            console.log(err);
            return next();
        }
    }
    
    next();
}

exports.signup = async (req, res) => {
    const {firstName, lastName, email, role, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await db.query(
            'INSERT INTO app_user (firstName, lastName, email, role, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, email, 'user', hashedPassword]
        );

        createSendToken(result.rows[0], 201, res);
    } catch (err) {
        res.status(500).json({error: err.message});
    }    
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) res.status(401).json({error: "Предоставьте логин и пароль"});

    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({error: "Некорретные данные"});
    }

    createSendToken(user, 200, res);
}