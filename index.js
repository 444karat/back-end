const express = require("express");
const mongo = require("mongoose");

const db_url = "mongodb+srv://user:1@auth.rpgtj.mongodb.net/auth?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
const router = new express();
const app = express();

const UserScheme  = new mongo.Schema({
    name : {type: String, unique : true, required: true},
    pass : {type: String , required: true}
})
const UsersDB  = mongo.model('User' , UserScheme );

class authContro{
    async reg(req, res){
        try{
            const {name , pass} = req.body;
            const chekUser =await  UsersDB .findOne( {name });

            if(chekUser){
                res.status(400).json({message:"уже есть походу"});
            }
            else{
                const user = new UsersDB({name, pass});
                await user.save();
                return res.json({message: "add"});
            }
        }catch (e) {
            console.log(e.message);
            res.status(400).json({message:"оишкба регистрации"});

        }
    }
    async log(req, res){
        try{
            const {name, pass} = req.body;
            const chekUser =await  UsersDB .findOne( {name, pass });
            if(!chekUser) {
                return res.status(400).json({message:`неверный логин или пароль`});
            }
            return res.json({message: "log in"});
        }catch (e) {
            console.log(e);
            res.status(400).json({message:"оишкба авторизации"});
        }
    }
}
const controller = new authContro();

app.use(express.json());
app.use("/auth" , router);
router.post("/reg" , controller.reg);
router.post('/log' , controller.log);


async function start() {
    try{
        await mongo.connect(db_url, {useNewUrlParser: true ,  useUnifiedTopology: true});
        app.listen(PORT, ()=> {console.log(`сервер на ${PORT}`);});
    }catch (e) {
        console.log(e);
    }
}
start();




