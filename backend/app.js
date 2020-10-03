const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://radu:UnthoeP6JuOec6qe@bachelorscluster.nrvdc.mongodb.net/BookTraderDB?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to the DB')
  })
  .catch(() => {
    console.log('Error connecting to DB')
  })

const Book = require('./models/book')
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

app.post("/api/personal-book-page", (req, res, next) => {
  const { title, category, description, tradingPreferenceList } = req.body;
  new Book({
    title,
    category,
    description,
    tradingPreferenceList
  }).save()
    .then(newBook => {
      res.status(201).json({
        message: 'Book added successfully',
        bookId: newBook._id
      });
    })
});

app.get("/api/personal-book-page", (req, res, next) => {
  Book.find().then(books => {
    res.status(200).json({
      message: "Books fetched successfully!",
      books: books
    });
  })
});

app.put('/api/personal-book-page/', (req, res, next) => {
  const books = req.body;
  books.forEach(book => {
    Book.updateOne({ _id: book['id'] }, book)
      .then(() => {
        res.status(201).json({ message: 'update successfull'});
      })
  })
});


app.delete('/api/personal-book-page/:id', (req, res, next) => {
  Book.deleteOne({ _id: req.params.id})
    .then(() => {
      res.status(200).json({ message: 'Book deleted !'});
    })
});

module.exports = app;
