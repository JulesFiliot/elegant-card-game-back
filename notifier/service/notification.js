/*
var https = require('https');
var http = require('http');

https.globalAgent.maxSockets = 100;
http.globalAgent.maxSockets = 100;
*/


const axios = require("axios");
const mainURL = 'http://localhost:3001/';

exports.notify = (req,res,callback) =>{
    let URL = mainURL + 'notify/' + req.params.msg;
    axios.get(URL)
    .then((response) => {
        /*
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        */
        console.log(req.params.msg)
        return callback(null, response.data);
    }).catch(function (error) {
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        return callback(error);
    });
};