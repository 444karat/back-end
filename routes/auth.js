const express = require('express');

const router = express.Router();

router.post('/register', require('../controllers/auth.js'));

module.exports = router;