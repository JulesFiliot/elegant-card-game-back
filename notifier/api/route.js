const Controller = require("./controller")
const express = require("express");
let router = express.Router();

let multer = require('multer');
let upload = multer();

router.get("/notify/:msg", upload.array(), Controller.notify);
router.post('/notify', Controller.notif);
module.exports = router;