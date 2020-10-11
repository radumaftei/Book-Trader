const express = require('express')
const Book = require('../models/book')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

router.get('', checkAuth, (req, res, next) => {
  Book.find().then(books => {
    const allBooks = books.filter(book => book.userId.toString() !== req.userData.userId.toString());
    res.status(200).json({
      message: 'Books fetched successfully!',
      books: allBooks,
      userData: {
        location: req.userData.location
      }
    })
  })
})

module.exports = router
