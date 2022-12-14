const express = require("express");
const bodyParser = require("body-parser")

const poolRouter = require('../routes/pool');

const PORT = 3000;
const HOST_NAME = "localhost";

const app = express();
app.use(express.static("client"));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/pool",poolRouter)


app.listen(PORT, HOST_NAME, ()=> {
    console.log(`Server running at ${HOST_NAME}:${PORT}`)
})