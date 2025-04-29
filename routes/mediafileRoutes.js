const express = require('express');
const authController = require('../controllers/authController');
const mediaController = require('../controllers/mediaController')

const router = express.Router();

router.get("/myfiles", authController.protect, mediaController.getMediafilesOfUser);

module.exports = router;