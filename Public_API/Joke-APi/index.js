import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.get("/",async (req,res)=>{

    const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
    console.log(response.data);

    res.render("index.ejs",{category:response.data.category,setup:response.data.setup,delivery:response.data.delivery,type:response.data.type});
});

app.listen(port,()=>{
    console.log(`listening on port : ${port}`);
});
