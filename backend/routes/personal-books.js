const express = require("express");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const Book = require("../models/book");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    const error = isValid ? null : new Error("Invalid mime type!");
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = `${req.protocol}://${req.get("host")}`;
    const {
      title,
      author,
      category,
      description,
      tradingPreferenceDescription,
      tradingPreferenceAuthor,
      tradingPreferenceBook,
      tradingPreferenceGenre,
    } = req.body;
    new Book({
      title,
      author,
      category,
      description,
      tradingPreferenceDescription,
      tradingPreferenceAuthor,
      tradingPreferenceBook,
      tradingPreferenceGenre,
      imagePath: `${url}/images/${req.file.filename}`,
      userId: req.userData.userId,
      username: req.userData.email.split("@")[0],
      location: req.userData.location,
    })
      .save()
      .then((addedBook) => {
        addedBook = addedBook.toObject();
        res.status(201).json({
          message: "Book added successfully",
          newBook: {
            ...addedBook,
            id: addedBook._id,
          },
        });
      });
  }
);

router.get("", checkAuth, (req, res, next) => {
  Book.find({ userId: req.userData.userId }).then((books) => {
    res.status(200).json({
      message: "Your books fetched successfully!",
      books: books,
    });
  });
});

router.put("", checkAuth, (req, res, next) => {
  const books = req.body;
  books.forEach((book) => {
    Book.updateOne({ _id: book["id"] }, book).then(() => {
      res.status(201).json();
    });
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Book.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({ message: "Book deleted !" });
  });
});

module.exports = router;
