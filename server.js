const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const router = require("./routes/route");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index",{
    pageTitle: 'Home'
  });
});

app.use("/posts", router);

app.get("*", (req, res) => {
  res.status(404).render("404");
});

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URL, () => {
  app.listen(PORT);
});
