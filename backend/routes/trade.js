const express = require("express");
const fs = require("fs");

const checkAuth = require("../middleware/check-auth");
const Trade = require("../models/trade");
const Book = require("../models/book");

const router = express.Router();

const IMAGES_DIR_PATH = "backend/images";

const TRADE_STATUSES = Object.freeze({
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  REJECTED: "REJECTED",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED",
});

router.post("", checkAuth, (req, res) => {
  const [town, method] = req.body.tradeMethod.split("-");
  Book.findOne({
    _id: {
      $in: [
        req.body.tradedWithBookId,
        req.body.tradedBookId
      ]
    },
    hidden: true
  }).then((book) => {
    if (!book) {
      new Trade({
        ...req.body,
        accepted: false,
        rejected: false,
        tradeMethod: {
          [town]: method,
        },
        status: TRADE_STATUSES.PENDING,
        completedBy: "",
        readBy: req.userData.email,
      })
        .save()
        .then(() => {
          res.status(201).json();
        });
    } else {
      res.status(401).json({
        message: "Book is present in another active trade, please try agian later",
      });
    }
  })

});

router.get("", checkAuth, (req, res, next) => {
  const { all } = req.query;
  all === "false"
    ? Trade.find({ toUser: req.userData.email }).then((trades) => {
        res.status(200).json(trades);
      })
    : Trade.find({ toUser: req.userData.email }).then((firstTrades) => {
        Trade.find({ fromUser: req.userData.email }).then((secondTrades) => {
          res.status(200).json(firstTrades.concat(secondTrades));
        });
      });
});

router.put("", checkAuth, (req, res, next) => {
  const {
    trade: {
      fromUser,
      toUser,
      _id,
      fromPhoneNumber,
      toPhoneNumber,
      readBy,
      tradedBookId,
      tradedWithBookId,
      completedBy,
    },
    tradeType,
  } = req.body;
  const bookIds = [tradedBookId, tradedWithBookId];
  let isCurrentRequestingUserInReadBy = readBy.includes(req.userData.email);
  let finalReadBy = isCurrentRequestingUserInReadBy
    ? readBy
    : readBy.concat(req.userData.email);
  let finalCompletedBy = completedBy;
  let deleteBooksAfterCompleted = false;
  const otherUserToBeRemoved = fromUser !== req.userData.email ? fromUser : toUser;
  let finalFromUser = toUser;
  let finalToUser = fromUser;

  finalReadBy = finalReadBy
    .split(otherUserToBeRemoved)
    .join("");

  if (tradeType === TRADE_STATUSES.COMPLETED) {
    finalCompletedBy = finalCompletedBy.concat(req.userData.email);
    deleteBooksAfterCompleted = finalCompletedBy.includes(toUser) && finalCompletedBy.includes(fromUser);
  }

  if (fromUser === req.userData.email) {
    finalFromUser = fromUser;
    finalToUser = toUser;
  }

  Trade.updateOne(
    { _id },
    {
      status: tradeType,
      fromUser: finalFromUser,
      toUser: finalToUser,
      fromPhoneNumber: toPhoneNumber,
      toPhoneNumber: fromPhoneNumber,
      readBy: finalReadBy,
      completedBy: finalCompletedBy
    }
  ).then(() => {
    if (tradeType === TRADE_STATUSES.IN_PROGRESS) {
      bookIds.forEach((bookId) => {
        Book.updateOne(
          { _id: bookId },
          {
            hidden: true,
          }
        ).then(() => {
          res.status(201).json();
        });
      });
    } else if (tradeType === TRADE_STATUSES.REJECTED) {
      res.status(201).json();
    } else if (tradeType === TRADE_STATUSES.CANCELED) {
      bookIds.forEach((bookId) => {
        Book.updateOne(
          { _id: bookId },
          {
            hidden: false,
          }
        ).then(() => {
          res.status(201).json();
        });
      });
    } else if (tradeType === TRADE_STATUSES.COMPLETED) {
      if (deleteBooksAfterCompleted) {
        bookIds.forEach((bookId) => {
          Book.findOne({ _id: bookId }).then((book) => {
            const imagePathArray = book.imagePath.split("/");
            const path = `${IMAGES_DIR_PATH}/${
              imagePathArray[imagePathArray.length - 1]
            }`;
            Book.deleteOne({ _id: req.params.id }).then(() => {
              fs.unlink(path, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                res.status(200).json();
              });
            });
          });
        })
      } else {
        res.status(200).json();
      }
    }
  });
});

router.put("/readBy", checkAuth, (req, res) => {
  const { tradeIds } = req.body;
  tradeIds.forEach((_id) => {
    Trade.findOne({ _id }).then((trade) => {
      const readBy = trade.readBy;
      const finalReadBy = !readBy.includes(req.userData.email)
        ? trade.readBy.concat(req.userData.email)
        : readBy;
      Trade.updateOne(
        { _id },
        {
          readBy: finalReadBy,
        }
      ).then(() => {
        res.status(201).json();
      });
    });
  });
});

module.exports = router;
