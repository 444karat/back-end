const express = require('express');
const User = require('../modeles/users.js');
const bcrypt = require('bcryptjs')
const router = express.Router();

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
            return res.json({message: "log in"});
        }catch (e) {
            console.log(e);
            res.status(400).json({message:"оишкба авторизации"});
        }
    });

module.exports = router