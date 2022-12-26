const Controller = require("./controller")
const express = require("express");
const bodyParser = require("body-parser");

let router = express.Router();
router.use(bodyParser.json());
router.get("/pool/:userId", Controller.pool);
router.get("/cancel_pool/:userId", Controller.cancelPool)
module.exports = router;