const express = require("express");
const bodyParser = require("body-parser")

//const aboutRouter = require("./routes/about");
const duelRouter = "";
const PORT = 3000;
const HOST_NAME = "localhost";

const app = express();
app.use(express.static("client"));
app.use(bodyParser.urlencoded({extended: true}));

//app.use("/about", aboutRouter);
app.use('/duel',duelRouter);
app.use('/attack',attackRouter);
app.use('/duel_info',duelRouter);
app.use('/end_turn',duelRouter);
