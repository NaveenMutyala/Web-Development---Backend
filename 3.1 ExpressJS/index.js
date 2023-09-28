import express from "express";

var app = express();
var port = 3000;

app.listen(port,()=>{
    console.log("Server is running on port 3000");
})