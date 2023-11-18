//jshint esversion:6
import 'dotenv/config';
import express from "express";
import bodyparser from "body-parser";
import ejs from "ejs";
import mongoose from "mongoose";
import encrypt from "mongoose-encryption";

const mydb = "mongodb://0.0.0.0:27017/Test";
const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');

mongoose.connect(mydb).then(() => console.log('Connected!'));

const UserSchema = new mongoose.Schema({
    username: String,
    password:String
  });

UserSchema.plugin(encrypt,{secret:process.env.SECRET, encryptedFields:["password"]});
const User = mongoose.model('User', UserSchema);


app.get( "/",async(req,res)=>{
   
    res.render("home");
});

app.get( "/login",(req,res)=>{
    res.render("login");
});
app.get( "/register",(req,res)=>{
    res.render("register");
});
app.post("/register",async(req,res)=>{
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    await user.save();
    const result = await User.find({})
    console.log(result);
    res.render("secrets");
});
app.post("/login",async(req,res)=>{
    const result = await User.find({"username":req.body.username});
    console.log(result);
    if (result[0].password === req.body.password){
        res.render("secrets");
    }

});


app.listen(port,(res)=>{
    console.log(`listening on port ${port}`)
});