const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/Campground");

mongoose
  .connect("mongodb://localhost/yelp-camp", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION SUCCESS!");
  })
  .catch((err) => {
    console.LOG("Error connecting to mongo", err);
  });

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/makecampground", async (req, res) => {
  const camp = new Campground({ title: "My Backyard" });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});
