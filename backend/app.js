const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const booksRoutes = require('./routes/books')

mongoose.connect('mongodb+srv://radu:UnthoeP6JuOec6qe@bachelorscluster.nrvdc.mongodb.net/BookTraderDB?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to the DB')
  })
  .catch(() => {
    console.log('Error connecting to DB')
  })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use('/api/personal-book-page', booksRoutes)

module.exports = app;
