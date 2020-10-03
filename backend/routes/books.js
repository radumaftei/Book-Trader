const express = require('express')
const router = express.Router()

const Book = require('../models/book')

router.post('', (req, res, next) => {
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

router.get('', (req, res, next) => {
  Book.find().then(books => {
    res.status(200).json({
      message: "Books fetched successfully!",
      books: books
    });
  })
});

router.put('', (req, res, next) => {
  const books = req.body;
  books.forEach(book => {
    Book.updateOne({ _id: book['id'] }, book)
      .then(() => {
        res.status(201).json();
      })
  })
});


router.delete('/:id', (req, res, next) => {
  Book.deleteOne({ _id: req.params.id})
    .then(() => {
      res.status(200).json({ message: 'Book deleted !'});
    })
});

module.exports = router
