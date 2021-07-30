const express = require('express');
const User = require('../modeles/users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

function generateAccessToken(id) {
    const payload = {id};
    return jwt.sign(payload, {secret: "SECRET_KEY_RANDOM"}, {expiresIn: "24h"});
}

router.route('/')
    .get((req, res) => {
        res.send('это должно приводить к форме входа')
    })

    .post(async function (req,res,next) {
        try{
            const {username, pass} = req.body;
            const chekUser =await  User.findOne( {username});
            const validPass = bcrypt.compareSync(pass, chekUser.pass);
            if(!validPass) {
                return res.status(400).json({message:`неверный логин или пароль`});
            }
            const token = generateAccessToken(chekUser._id);
            res.json({message: "log in"},
                            {token});
            return res.redirect("/");
        }catch (e) {
            console.log(e);
            res.status(400).json({message:"оишкба авторизации"});
        }
    });

module.exports = router