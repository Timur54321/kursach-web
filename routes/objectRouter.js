const express = require('express');
const multer = require('multer');
const objectController = require('../controllers/objectController');

const router = express.Router();

router.get("/:key", objectController.getFile);

module.exports = router;