const Controller = require("./controller")
const express = require("express");
let router = express.Router();
router.get("/notify/:msg",Controller.notify);
module.exports = router;