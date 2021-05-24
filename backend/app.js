const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");

const app = express();
const personalBooksRoutes = require("./routes/personal-books");
const homepageBooksRoutes = require("./routes/homepage-books");
const userRoutes = require("./routes/user");

mongoose
  .connect(
    "mongodb+srv://radu:UnthoeP6JuOec6qe@bachelorscluster.nrvdc.mongodb.net/BookTraderDB?w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log(chalk.green("Connected to the DB"));
  })
  .catch((err) => {
    console.log(chalk.red("Error connecting to DB", err));
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use("/api/personal-book-page", personalBooksRoutes);
app.use("/api/user", userRoutes);
app.use("/api/homepage", homepageBooksRoutes);

module.exports = app;
