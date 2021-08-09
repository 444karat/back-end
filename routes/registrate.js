
const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.redirect('/api/create');
    });

module.exports = router