const express = require("express");
const path = require("path");
const app = express();
var PORT = process.env.PORT || 5000;
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/contactdance");
  //   console.log("we are connected");
}

//this is the schema of backend
var contactSchema = new mongoose.Schema({
  name: String,
  phone:  String,
  email: String, 
  address: String,
  desc: String, 
});

var contact = mongoose.model("contact", contactSchema);

//express specific code
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// pug specific stuff
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//endpoints
app.get("/", (req, res) => {
  const param = {};
  res.status(200).render("home.pug", param);
});

app.get("/contact", (req, res) => {
  const param = {};
  res.status(200).render("contact.pug", param);
});

app.get("/facilities", (req, res) => {
  const param = {};
  res.status(200).render("facilities.pug", param);
});

app.get("/schedule", (req, res) => {
  const param = {};
  res.status(200).render("schedule.pug", param);
});

//post backend request
//ALSO USE NPM I BODY PARSER
app.post("/contact", (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("this all data is saved in database")
    }).catch(()=>{
        res.status(400).send("this item is not saved in our database")
    })

    // res.status(200).render("contact.pug");
  });

//start the server
app.listen(PORT, () => {
  console.log(`this app is started successfully on ${PORT}`);
});
