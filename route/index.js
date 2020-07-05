
const express = require("express")
const app = express()
const mailController = require('../controller/mailController');

app.post('/login',mailController.login)

module.exports = app
console.log('here')


