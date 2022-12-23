const Controller = require("./controller")
const express = require("express");
const bodyParser = require("body-parser");

let router = express.Router();
router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));
//router.get("/distance/:zipcode1/:zipcode2",Controller.getDistance);
router.post("/duelInfo",Controller.getDuelInfo); //for testing purposes
router.post("/init",Controller.initDuel);
router.post("/attack", Controller.attack);
router.post("/choose_cards", Controller.chooseCards);
router.post("/end_turn", Controller.endTurn);
module.exports = router;