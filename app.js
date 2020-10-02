// jshint esversion:6
const express =require("express");
const faker= require("faker");
const mysql= require("mysql");
const app= express();
const bodyParser= require("body-parser");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
//
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database:"joinUS",
});

connection.connect(function (err){
  if (err) {
    return console.log(err);
  }
    console.log("connected to mySQL server.");
});

//------ 'inserting data into table'--------------
// const data =[];
//
// for (let i=0; i<500; i ++){
//   data.push([faker.internet.email(), faker.date.past()]);
// }
//
// let q= "INSERT INTO users (email, created_at) values ?";
// connection.query(q, [data], function(err, result){
// console.log(err);
// console.log(result);
// });
// ------- 'inserting data into table-------------




app.get("/", function (req, res){

  let q="SELECT COUNT(*) as count FROM users";
  connection.query(q, function(err, result){
    if (err) throw (err);
    console.log(result);
      res.render("home", {userCount: result[0].count});
  });
});

app.post("/register", function(req, res){
  let person= {email :req.body.email};
  connection.query("INSERT INTO users SET ?", person, function(err, result){
    if (err) throw(err);
    console.log(result);
    res.redirect("/")
  });
  });


// connection.end();
//
//
//
//
app.listen(3000, function(){
  console.log("Server is up on 3000");
});
