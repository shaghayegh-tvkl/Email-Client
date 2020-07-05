
const express = require("express")
const app = express()
const mailController = require('../controller/mailController');

app.get('/login',mailController.login)
// app.get('inbox')

// app.get('/createactivitytype', mailController.mail);

module.exports = app
console.log('here')


