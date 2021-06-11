const express = require("express");

const checkAuth = require("../middleware/check-auth");
const Trade = require("../models/trade");
const Book = require("../models/book");

const router = express.Router();

const TRADE_STATUSES = Object.freeze({
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
})

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
    },
    status: TRADE_STATUSES.PENDING,
    completedBy: ''
  }).save()
    .then(() => {
      res.status(201).json()
    })
})

router.get("", checkAuth, (req, res, next) => {
  const {all} = req.query;
  all === 'false' ? Trade.find({ toUser: req.userData.email }).then((trades) => {
    res.status(200).json(
      trades
    );
  }) : Trade.find({ toUser: req.userData.email }).then((firstTrades) => {
    Trade.find({ fromUser: req.userData.email }).then((secondTrades) => {
      res.status(200).json(
        firstTrades.concat(secondTrades)
      );
    })
  })
});

router.put("", checkAuth, (req, res, next) => {
  const { trade: { fromUser, toUser, _id }, tradeType } = req.body;
  const { trade } = req.body;
  Trade.updateOne({ _id }, {
    status: tradeType,
    fromUser: toUser,
    toUser: fromUser
  } ).then(() => {
    const bookIds = [trade.tradedBookId, trade.tradedWithBookId];
    bookIds.forEach((bookId) => {
      Book.updateOne({ _id: bookId }, {
        hidden: true
      }).then(() => {
        res.status(201).json();
      })
    })
  });
});

module.exports = router;
