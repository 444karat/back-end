const knexConfig = require('../db/knexfile.js');
const db = require('knex')(knexConfig[process.env.NODE_ENV],
);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Register {
    async reg(req,res,next){
        const salt = await bcrypt.getSalt(10);
        const pass = await bcrypt.hash(req.body.password,salt);
        const login = req.body.login;
        try{
            await db('users').insert([   {login: login, password: pass}]);
        }catch (e) {
            console.log(e);
        }

        const uId = await db('users').select('userId').where('login', login);

        const token = jwt.sign({id: uId}, 'SECRET');
    }
}

module.exports = new Register();