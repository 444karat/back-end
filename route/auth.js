const express = require('express');
const  passport = require('passport');
const User = require('../DB/users.js');
const mongo = require("mongoose");
const hashPassword = require('../servic/pass.servic.js');


const mongo_DB = process.env.MongoURL;





const router = express.Router();

router.route('/log')
    .get((req, res) => {
        res.send('это должно приводить к форме входа')
    })

    .post(async function (req,res,next) {
        try{
            const {username, pass} = req.body;
            const chekUser =await  User.findOne( {username});
            const validPass = await bcrypt.compareSync(pass, chekUser.pass);
            if(!validPass) {
                return res.status(400).json({message:`неверный логин или пароль`});
            }


            // return res.redirect("/");
        }catch (e) {
            console.log(e);
            res.status(400).json({message:"оишкба авторизации"});
        }
    });

router.route('/reg')
    .get((req, res) => {
        res.send('это должно приводить к форме входа')
    })
    .post(async  function (req,res) {
        try{
            await mongo.connect(db_url, {useNewUrlParser: true ,  useUnifiedTopology: true}, function (err) {
                console.log("conncet DB");});
            const {username , pass, email} = req.body;
            const chekUser =await  User.findOne( {username });

            if(chekUser){
                res.status(400).json({message:"уже есть походу"});
            }
            else{
                const hash = await hashPassword(pass);
                const new_user = await new User({username, pass : hash, email});
                await new_user.save();

                return res.json({message: "req"});
            }
            await  mongo.close();
        }catch (e) {
            console.log(e);
            res.status(400).json({message:"оишкба регистрации"});
        }
    });

module.exports = router