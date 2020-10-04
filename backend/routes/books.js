const express = require('express')
const multer = require('multer')
const Book = require('../models/book')

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const router = express.Router()
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]
    const error = isValid ? null : new Error('Invalid mime type!')
    cb(error, 'backend/images')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-')
    const ext = MIME_TYPE_MAP[file.mimetype]
    cb(null, `${name}-${Date.now()}.${ext}`)
  }
})

router.post('', multer({ storage: storage }).single('image'), (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}`;
  const { title, category, description, tradingPreferenceList } = req.body;
  new Book({
    title,
    category,
    description,
    tradingPreferenceList,
    imagePath: `${url}/images/${req.file.filename}`
  }).save()
    .then(addedBook => {
      res.status(201).json({
        message: 'Book added successfully',
        newBook: {
          id: addedBook._id,
          title: addedBook.title,
          description: addedBook.description,
          category: addedBook.category,
          tradingPreferenceList: addedBook.tradingPreferenceList,
          imagePath: addedBook.imagePath
        }
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
