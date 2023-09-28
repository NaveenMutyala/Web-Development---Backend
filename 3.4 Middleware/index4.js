import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));
var bandName="";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req,res,next){
  // bandName = req.body.street+req.body.pet;
  bandName = req.body["street"]+req.body["pet"];
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit",(req,res)=>{

  // var bandName = req.body.street+req.body.pet
  res.send(`<h1>Band Name:</h1>
  <h2>${bandName}</h2>`);
});




app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
