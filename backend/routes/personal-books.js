const express = require("express");
const multer = require("multer");
const fs = require("fs");

const checkAuth = require("../middleware/check-auth");
const Book = require("../models/book");
const Trade = require("../models/trade");
const TRADE_STATUSES = require('../constants').TRADE_STATUSES;

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const IMAGES_DIR_PATH = "backend/images";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    const error = isValid ? null : new Error("Invalid mime type!");
    cb(error, IMAGES_DIR_PATH);
  },

  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-")
      .split(".")[0];
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });
router.post("", checkAuth, upload.single("image"), (req, res, next) => {
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
    hidden: false,
  })
    .save()
    .then((addedBook) => {
      addedBook = addedBook.toObject();
      res.status(201).json({
        ...addedBook,
        id: addedBook._id,
      });
    });
});

router.get("", checkAuth, (req, res, next) => {
  const { pageIndex, pageSize, withPagination } = req.query;
  Book.find({ userId: req.userData.userId }).then((books) => {
    const length = books.length;
    const booksByQuery =
      withPagination === "true"
        ? books.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        : books;
    res.status(200).json({
      books: booksByQuery,
      length,
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
  const bookIdToDelete = req.params.id;
  Book.findOneAndDelete({ _id: bookIdToDelete }).then((book) => {
    const imagePathArray = book.imagePath.split("/");
    const path = `${IMAGES_DIR_PATH}/${
      imagePathArray[imagePathArray.length - 1]
    }`;
    fs.unlink(path, (err) => {});

    Trade.updateMany({
      $or: [ {
        tradedBookId: bookIdToDelete
      },
        {tradedWithBookId: bookIdToDelete}]
    },
      {
        status: TRADE_STATUSES.CANCELED
      }).then((trades) => {
        res.status(201).json();
    })
  });
});

module.exports = router;
