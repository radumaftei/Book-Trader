const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/myBooks", (req, res, next) => {
  const book = req.body;
  console.log('POSTED BOOKS = ', book);
  res.status(201).json({
    message: 'Book added successfully'
  });
});

app.get("/api/myBooks", (req, res, next) => {
  const books = [
    {
      id: "fadf12421l",
      title: "First server-side book",
      description: "This is coming from the server",
      category: 'SF',
      tradingPreferenceList: 'Harry Potter, Capra cu trei iezi'
    },
    {
      id: "freq21l",
      title: "Second server-side book",
      description: "This is coming from the server",
      category: 'SF 2',
      tradingPreferenceList: 'Harry Potter, Capra cu trei iezi'
    }
  ];
  res.status(200).json({
    message: "Books fetched successfully!",
    books: books
  });
});

module.exports = app;
