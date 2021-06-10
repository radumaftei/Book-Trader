const express = require("express");

const checkAuth = require("../middleware/check-auth");
const Trade = require("../models/trade");

const router = express.Router();

router.post("", checkAuth, (req, res) => {
  const {
    fromUser,
    toUser,
    description,
    tradeMethod,
    tradedBookTitle,
    tradedWithBookTitle,
    tradedBookId,
    tradedWithBookId
  } = req.body;
  const [ town, method ] = tradeMethod.split('-');
  new Trade({
    fromUser,
    toUser,
    tradedBookTitle,
    tradedWithBookTitle,
    tradedBookId,
    tradedWithBookId,
    description,
    accepted: false,
    rejected: false,
    tradeMethod: {
      [town]: method
    }
  }).save()
    .then((trade) => {
      res.status(201).json()
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
