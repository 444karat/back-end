const express = require('express');
const db = require('../DB/DB.js');
const knex = require('knex')({
    client: 'pg',
    connection: process.env.postgresUrl
});


const router = express.Router();

router.route('/add')
    .get( function (req,res) {
        res.send("это должно приводить к форме регистрации");
    })
    .post(async (req,res ) =>{
        const {name , position, pay , data} = req.body;
        const query  ={
            text:'INSERT INTO employees (name , position, pay , data)  VALUES ($1, $2, $3, $4)',
            values : [name,position,pay,data],
        };

        await db.getClient();
        await db.query(query);
        return;
    })
    .delete(async (req,res) => {

    })

module.exports = router