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

//function to create token based on userID
const createToken = (userId) => {
    const payload = {
        userId: userId,
    }

    //Generate the token with a secret key and expiration time
    const token = jwt.sign(payload, "L9%bg!qfPxh%v%Ym$g!mN$a!aERC!9DE", {expiresIn: "6h"});

    return token;
}

//endpoint for logging in
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  //check if th email and password are provided
  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "Email and Password are both required to login!" });
  }

  //check for user in backend
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        //user not found
        return res.status(404).json({ message: "Invalid Email!" });
      }

      //compare provided password with the password in the db
      if (user.password !== password) {
        return res.status(404).json({ message: "Invalid Password!" });
      }

      const token = createToken(user._id);
      res.status(200).json({ token });
    })
    .catch((err) => {
      console.log("Couldn't find user: ", err);
      res
        .status(500)
        .json({ message: "Internal server error! Contact support." });
    });
});
