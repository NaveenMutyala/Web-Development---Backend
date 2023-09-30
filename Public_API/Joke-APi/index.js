import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API = "fe7ba587332985bd0a8016bb03cd8a3a";


app.get("/",async (req,res)=>{

    const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
    // console.log(response.data);

    res.render("index.ejs",{category:response.data.category,setup:response.data.setup,delivery:response.data.delivery,type:response.data.type});
});

app.get("/weather",async (req,res)=>{
    console.log("hel");
    const result = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=${API}`);
    console.log(result.data)
    res.send(`<h1>${result.data}</h1>`);
})

app.listen(port,()=>{
    console.log(`listening on port : ${port}`);
});
