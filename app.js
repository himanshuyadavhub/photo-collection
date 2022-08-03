const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const MongoDBStore = require("connect-mongodb-session")(session);
const connectDB = require("./db/db");

const auth = require("./controller/authentication");
const photoCollection = require("./controller/photo-collection");
const isAuth = require("./middleware/is-auth");
const multerStorage = require('./controller/multerStorage');
const app = express();

connectDB();

const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/sessions",
    collection: "mySessions",
  }
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));





app.get("/", (req,res)=>{
  res.render("landing")
});

app.get("/login",auth.login_get);

app.get("/signup",auth.signup_get);

app.post("/login", auth.login_post);

app.post("/signup", auth.signup_post);

app.post("/logout", auth.logout_post);

app.get("/dashboard",isAuth,photoCollection.images_get);

app.post("/upload",multerStorage.uploadImg('image'),photoCollection.image_post);






app.listen(5000, console.log("App Running on http://localhost:5000"));

