const validator = require('validator');
var passwordValidator = require('password-validator');

// Create a schema
var schema = new passwordValidator();
schema
    .is().min(4)
    .is().max(10)
    .has().not().spaces();

exports.mdlwr = function (req,res,next){
    const {username , pass, email} = req.body;

    if (!validator.isEmail(email)){
        return res.json({error: "email is not valid"});
    }
    if (!schema.validate(pass)){
        return res.json({error: "pass is not valid"});
    }
    next();
}