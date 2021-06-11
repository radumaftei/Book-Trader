const express = require("express");

const checkAuth = require("../middleware/check-auth");
const Trade = require("../models/trade");

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
  Trade.find({ toUser: req.userData.email }).then((trades) => {
    res.status(200).json(
      trades
    );
  });
});

router.put("", checkAuth, (req, res, next) => {
  const { trade: { fromUser, toUser, _id }, tradeType } = req.body;
  Trade.updateOne({ _id }, {
    status: tradeType,
    fromUser: toUser,
    toUser: fromUser
  } ).then(() => {
    res.status(201).json();
  });
});

module.exports = router;
