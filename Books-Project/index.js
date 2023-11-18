import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import http from "https";
import path from "path";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "MovieReview",
    password: "2928",
    port: 5432,
  });
  db.connect();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));

var result = "";

app.get("/addReview",(req,res)=>{
  res.render("newReview.ejs")
});
app.post("/add",async(req,res)=>{
  const pat =  `/imdb/imdbSearchByName?query=${req.body.moviename}`;
  console.log(pat);
  var options = {
    "method": "GET",
    "hostname": "api.collectapi.com",
    "port": null,
    "path": pat,
    "headers": {
      "content-type": "application/json",
      "authorization": "apikey 0zpXGnCqyY9vm3KgyG4lgy:010GW9QtLatyDPa7rzelgy"
    }
  };
  
  var request = http.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      result = body.toString();
      // console.log(body.toString());
    });
  });
  
  request.end();
  console.log(req.body);
  // console.log(result);
  result = JSON.parse(result);
  console.log(result)

  if(result.succuess == true){
    await db.query("INSERT INTO movies(movie_name,rating,review,poster) VALUES ($1,$2,$3,$4)",[result.result[0].Title,req.body.rating,req.body.review,result.result[0].Poster]);
    res.redirect("/");
  }
  else{
    res.redirect("/newReview",{"error":"please enter correct movie name"});
  }

});


app.get("/",async(req,res)=>{

    const result = await db.query("SELECT * from movies");
    const movies = result.rows;
    console.log(movies);
    res.render("index.ejs",{"movies":movies});
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});