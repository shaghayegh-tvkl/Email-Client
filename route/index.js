
const express = require("express")
const app = express()
const mailController = require('../controller/mailController');

app.post('/login',mailController.login)
app.get('/showInbox',mailController.showInbox)
module.exports = app
console.log('here')


