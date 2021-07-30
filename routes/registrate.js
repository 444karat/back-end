
const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        //res.send("redirect");
        res.redirect('/api/create');
    });

module.exports = router