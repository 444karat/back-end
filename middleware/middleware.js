const validator = require('validator');

exports.mdlwr = function (req,res,next){
    const {username , pass, email} = req.body;

    if (!validator.isEmail(email)){
        return res.json({error: "email is not valid"});
    }
    /*if (){

    }*/
    next();
}