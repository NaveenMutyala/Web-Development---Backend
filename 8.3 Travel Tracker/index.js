import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "2928",
  port: 5432,
});
db.connect();
var countries =[];
var temp=[];





app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function visited(){
  countries = []
  const result = await db.query("select country_code from visited_country");
  temp=result.rows;
  for(var i =0 ;i<temp.length;i++){
    countries.push(temp[i].country_code);
  }
  return countries;
}


app.get("/", async (req, res) => {
  //Write your code here.
  // db.connect();
  const country = await visited();
  res.render("index.ejs",{"countries":country,"total":country.length})
});

app.post("/add",async(req,res)=>{
  // db.connect();
  console.log(req.body);
  const t = req.body["country"];
  // db.query("Insert INTO visited_countries VALUES($1,$2)",)

  try {
    const result = await db.query("select country_code from countries where LOWER(country_name) LIKE  '%' || $1 || '%' ",[req.body['country'].toLowerCase()]);
    console.log(result.rows);
      const code = result.rows[0].country_code;
    console.log(code)
    try {
      await db.query("INSERT INTO visited_country (country_code) VALUES ($1)",[code]);
    } 
    catch (error) {
      console.log("error");
      const country = await visited();
      res.render("index.ejs",
      {
        "countries":country,
        "total":country.length,
        "error":"This country is already visited"
      });
    }
    
    
    // db.end();
    res.redirect("/");
    
  
  } catch (error) {
    console.log(error);
    console.log("hello");
    const country = await visited();
    res.render("index.ejs",
    {
      "countries":country,
      "total":country.length,
      "error":"This country doesn't exist please try again "
    })
  }
  
  
  

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
