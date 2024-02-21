const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");

const app = express();
const port = 8000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb+srv://aaronr:admin@cluster0.sz07q3b.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.get("/", (req, res) => {
    res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

const User = require("./models/user");
const Message = require("./models/message");

//endpoint for registeration of user

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
  
    //create a new user object
    const newUser = new User({ name, email, password });
  
    //save user to the database in MongoDB
    newUser
      .save()
      .then(() => {
        res.status(200).json({ message: "User registered successfully" });
      })
      .catch((err) => {
        console.log("Error registering user", err);
        res.status(500).json({ message: "Error registering the user!" });
      });
  });
  

// app.post("/register", (req, res) => {
//   const { name, email, password } = req.body;

//   //create a new user object
//   const newUser = new User({ name, email, password });

//   //save user to database in MongoDB
//   newUser
//     .save()
//     .then(() => {
//       res.status(200).json({ message: "User registered successfully" });
//     })
//     .catch((err) => {
//       console.log("Error registering user", err);
//       res.status(500).json({ message: "Error registering the user!" });
//     });
// });

