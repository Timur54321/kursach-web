const S3 = require('aws-sdk/clients/s3');
const dotenv = require('dotenv');
dotenv.config({path: "./config.env"});

const s3 = new S3({
    credentials: {
        accessKeyId: process.env.S3ACCESS_KEY,
        secretAccessKey: process.env.S3SECRET_KEY
    },
    endpoint: "https://s3.storage.setcloud.ru",
    s3ForcePathStyle: true,
    region: "ru-1",
    apiVersion: "latest"
});

exports.getFile = async (req, res) => {
    const params = {
        Bucket: 'bucket-1',
        Key: req.params.key
    };

    s3.getObject(params, (err, data) => {
        if (err) return res.status(404).send(err);

        res.set('Content-Type', data.ContentType);
        res.send(data.Body);
    });
    
};
