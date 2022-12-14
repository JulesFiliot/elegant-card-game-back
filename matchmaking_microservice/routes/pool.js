const express = require("express");
const https = require('https');
const http = require('http');
//const fetch = require('node-fetch');
//import fetch from 'node-fetch'
const axios = require('axios');

const poolRoute = express.Router();

const pool = [];

poolRoute.post("/", (req, res)=> {
    res.sendFile(__dirname, + "index.html")   
})

poolRoute.get("/:userId", (req, res)=> {
    let user_id = req.params.userId;
    if (pool.length === 0) {
        pool.push(user_id);
        res.send("stored")
    } else if (pool.includes(user_id)) {
        res.send("already in the pool")
    } else {
        waiter_id = pool.shift();
        res.send("matched with"+waiter_id);
        //request to duel microservice with both ids
    }
})
module.exports = poolRoute