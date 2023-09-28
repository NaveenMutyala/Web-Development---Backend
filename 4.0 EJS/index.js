import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    const d = new Date();
    res.render("index.ejs",{
        "day":d.getDay()
    });
    // console.log(d.getDay);
})

app.listen(port,(req,res)=>{
    console.log(`Server Listening on ${port}`);
});