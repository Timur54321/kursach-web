const S3 = require('aws-sdk/clients/s3');
const dotenv = require('dotenv');
const { promisify } = require('util');
const {v4: uuidv4} = require('uuid');
const db = require('../db');
dotenv.config({path: "./config.env"});

const s3 = new S3({
    credentials: {
        accessKeyId: process.env.S3ACCESS_KEY,
        secretAccessKey: process.env.S3SECRET_KEY
    },
    endpoint: "https://s3.storage.selcloud.ru",
    s3ForcePathStyle: true,
    region: "ru-1",
    apiVersion: "latest"
});

exports.getFile = async (req, res) => {
    console.log("alo");
    try {
        const params = {
            Bucket: 'bucket-1',
            Key: req.params.key
        };

        const data = await s3.getObject(params).promise(); // Используем .promise()

        res.set('Content-Type', data.ContentType);
        res.send(data.Body);
    } catch (err) {
        res.status(404).json({ error: err.message || 'Failed to fetch file' });
    }
};

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) throw new Error("File was not founddd!!!");
        const fileName = `${uuidv4()}-${req.file.originalname}`;
        
        const result = await db.query(
            'INSERT INTO mediafile (user_id, file_name, file_size, file_key, mime_type, bucket_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [req.user.id, req.file.originalname, req.file.size, fileName, req.file.mimetype, 'bucket-1']
        );
        
        
        const params = {
            Bucket: 'bucket-1',
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };
        
        const data = await s3.upload(params).promise();
        res.json({ url: data.Location });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error loading file');
    }
}
