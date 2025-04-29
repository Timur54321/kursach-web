const db = require('../db');

exports.getMediafilesOfUser = async (req, res) => {
    const result = await db.query('SELECT * FROM mediafile WHERE user_id = $1', [req.user.id]);

    res.status(200).json({
        status: 'success',
        data: result.rows
    });
};