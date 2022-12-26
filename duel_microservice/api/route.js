const Controller = require("./controller")
const express = require("express");
const bodyParser = require("body-parser");

let router = express.Router();
router.use(bodyParser.json());
router.post("/duelInfo",Controller.getDuelInfo); //for testing purposes
router.post("/init",Controller.initDuel);
router.post("/attack", Controller.attack);
router.post("/choose_cards", Controller.chooseCards);
router.post("/end_turn", Controller.endTurn);
module.exports = router;