const express = require('express');
const multer = require('multer');
const objectController = require('../controllers/objectController');
const authController = require('../controllers/authController');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get("/:key", objectController.getFile);
router.post('/upload', upload.single('file'), authController.protect, objectController.uploadFile);

module.exports = router;