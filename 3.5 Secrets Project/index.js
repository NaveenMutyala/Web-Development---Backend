//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
function authenticate(req,res,next){
    if(req.body.password === "ILoveProgramming"){
        next();
    }
    else{
        res.sendFile(__dirname + "/public/index.html");
    }
   
    
}
app.use(authenticate);
app.post("/check",(req,res)=>{
    res.sendFile(__dirname+"/public/secret.html");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port,(req,res)=>{
    console.log(`server listening on port ${port}`)
})
