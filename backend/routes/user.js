const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkAuth = require("../middleware/check-auth");
const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber,
      sameTownConfig: {
        courier: true,
        onFoot: true,
      },
      differentTownConfig: {
        courier: true,
      },
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          user: {
            location: result.location,
            email: result.email,
          },
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: `Auth Failed. No user found with email ${req.body.email}`,
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed. Incorrect password",
        });
      }

      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
          location: fetchedUser.location,
        },
        "irejvorfrijfoiurejfflkjflkslmvkdsad21eqe3",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token,
        expiresIn: 3600,
        user: {
          email: fetchedUser.email,
          location: fetchedUser.location,
          phoneNumber: fetchedUser.phoneNumber,
        },
      });
    })
    .catch((error) => {
      return res.status(401).json({
        message: error,
      });
    });
});

router.put("/deliveryConfig", checkAuth, (req, res, next) => {
  User.updateOne({ _id: req.userData.userId.toString() }, req.body).then(() => {
    res.status(201).json();
  });
});

router.get("", checkAuth, (req, res, next) => {
  const userSearchQuery = req.query.userSearchQuery;
  const byId = req.query.byId === "true";
  const filterProperty = byId ? "_id" : "email";
  User.findOne({ [filterProperty]: userSearchQuery }).then((user) => {
    const {
      email,
      location,
      differentTownConfig,
      sameTownConfig,
      phoneNumber,
    } = user;
    res.status(200).json({
      email,
      location,
      phoneNumber,
      differentTownConfig,
      sameTownConfig,
    });
  });
});

module.exports = router;
