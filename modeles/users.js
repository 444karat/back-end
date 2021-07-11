const mongo = require("mongoose");


const UserScheme  = new mongo.Schema({
    username : {type: String, unique : true, required: true},
    pass : {type: String , required: true},
    email : {type: String}
})
const UsersDB  = mongo.model('User' , UserScheme );


module.exports = UsersDB;