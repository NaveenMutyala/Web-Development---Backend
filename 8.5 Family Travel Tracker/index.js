import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "family",
  password: "2928",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted(user_id) {
  const result = await db.query("SELECT country_code FROM visited_countries where user_id = $1",[user_id]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function addUser(name,color){
 const result = await db.query("INSERT INTO users (name,color) VALUES ($1,$2) RETURNING *",[name,color]);
 currentUserId = result.rows[0].id;
}

async function allUsers(){
  const results = await db.query("SELECT * from users");

  return results.rows;
}
async function currUser(id){
  const results = await db.query("select * from users where id = $1",[id]);
  return results.rows[0];
}
app.get("/", async (req, res) => {
  // const user_id = req.body.user || 1;
  // console.log(user_id)
  users = await allUsers();
  const countries = await checkVisisted(currentUserId);
  const currentUser = await currUser(currentUserId);
  console.log(countries);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  // console.log(req.body);
  // res.redirect("/");

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
        [countryCode,currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  // res.render("index.ejs",{user:req.body.user});
  console.log(req.body);
  if(req.body.add){
    res.render("new.ejs");
  }
  else{
    currentUserId= req.body.user;
    res.redirect("/");
  }
  

});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  // console.log(req.body);
  addUser(req.body.name,req.body.color);
  res.redirect("/");



  // res.render("new.ejs");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
