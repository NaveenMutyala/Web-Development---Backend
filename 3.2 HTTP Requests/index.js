import express from "express";

const app = express();
const port = 3000;

app.get("/",(req,res)=>{
    res.send("<h1>Hello world</h1>")
});

app.get("/about",(req,res)=>{
    res.send("<h2>THis is about page</h2>");
});

app.get("/contact",(req,res)=>{
    res.send("<h2>THis is contact page</h2>");
});

app.listen(port,()=>{
    console.log(`Server listening on ${port}`);
});