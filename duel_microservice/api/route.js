const Controller = require("./controller")
const express = require("express");
const bodyParser = require("body-parser");

let router = express.Router();
router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));
router.get("/distance/:zipcode1/:zipcode2",Controller.getDistance);
router.get("/init/:userId1/:userId2",Controller.initDuel);
router.get("attack/:id_att/:id_def", Controller.attack);
router.post("/choose_cards", Controller.chooseCards);
module.exports = router;