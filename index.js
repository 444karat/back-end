const express = require("express");
const mongo = require("mongoose");

const db_url = "mongodb+srv://user:1@auth.rpgtj.mongodb.net/auth?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/', require('./routes/rout.js'));
app.use('/users', require('./routes/users.js'));
app.use(function (req,res,next) {
    res.send({message: " 404 err;не найдено"});
});

async function start() {
    try{
        await mongo.connect(db_url, {useNewUrlParser: true ,  useUnifiedTopology: true});
        app.listen(PORT, ()=> {console.log(`сервер на ${PORT}`);});
    }catch (e) {
        console.log(e);
    }
}
start();




