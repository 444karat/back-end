const express = require('express');
const User = require('../modeles/users.js');
const bcrypt = require('bcryptjs')
const router = express.Router();


async function  hashPassword (password) {
    try {
        const salt = await bcrypt.genSalt(10,);
        return await bcrypt.hash(password, salt);
    } catch(err) {
        console.log(err);
        //throw new Error('Ошибка хеширования', err);
    }
};

router.route('/register')
    .get( function (req,res) {
        res.send("это должно приводить к форме регистрации");
    })
    .post(async function (req,res,next) {
        try{
            const {username , pass, email} = req.body;
            const chekUser =await  User.findOne( {username });

            if(chekUser){
                res.status(400).json({message:"уже есть походу"});
            }
            else{
                const hash = await hashPassword(pass);
                //console.log(hash);
                const new_user = new User({username, pass : hash, email});
                await new_user.save();

                return res.json({message: "add"});
            }
        }catch (e) {
            console.log(e);
            res.status(400).json({message:"оишкба регистрации"});
        }
    });


router.route('/login')
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

module.exports = router;