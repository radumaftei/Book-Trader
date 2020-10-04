const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const router = express.Router()

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      })
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created !',
            result
          })
        })
        .catch(error => {
          res.status(500).json({
            error
          })
        })
    })
})

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: `Auth Failed. No user found with email ${req.body.email}`
        })
      }
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed. Incorrect password'
        })
      }
      const token = jwt.sign(
        { email: result.email, userId: result._id },
        'irejvorfrijfoiurejfflkjflkslmvkdsad21eqe3',
        { expiresIn: '1h' }
        )
      res.status(200)
        .json({
          token
        })
    })
    .catch(error => {
      return res.status(401).json({
        message: error
      })
    })
})

module.exports = router
