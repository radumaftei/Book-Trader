const express = require("express");

const checkAuth = require("../middleware/check-auth");
const Trade = require("../models/trade");

const router = express.Router();

router.post("", checkAuth, (req, res) => {
  const {
    fromUser,
    toUser,
    bookTitle,
    tradeMethod
  } = req.body;
  const [ town, method ] = tradeMethod.split('-');
  console.log('TITLE', bookTitle)


  new Trade({
    fromUser,
    toUser,
    bookTitle,
    accepted: false,
    rejected: false,
    tradeMethod: {
      [town]: method
    }
  }).save()
    .then((trade) => {
      res.status(201).json({
        message: 'Trade yuyhuuuu'
      })
    })
})

router.get("", checkAuth, (req, res, next) => {
  Trade.find({ toUser: req.userData.email }).then((trades) => {
    res.status(200).json(
      trades
    );
  });
});

module.exports = router;
