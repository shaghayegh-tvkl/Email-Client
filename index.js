const express = require("express");
const router = express.Router();

const mailRouterHandler = require("./Route/index");



router.use("/mail", mailRouterHandler);




module.exports = router;
console.log("in index");
