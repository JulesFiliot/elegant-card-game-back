const Controller = require("./controller")
const express = require("express");
let router = express.Router();
router.get("/distance/:zipcode1/:zipcode2",Controller.getDistance);
router.get("/init/:userId1/:userId2",Controller.initDuel);
router.get("attack/:id_att/:id_def", Controller.attack)
module.exports = router;