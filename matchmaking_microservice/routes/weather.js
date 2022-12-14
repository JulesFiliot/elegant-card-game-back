const express = require("express");
const https = require('https');
const http = require('http');
//const fetch = require('node-fetch');
//import fetch from 'node-fetch'
const axios = require('axios');

const weatherRoute = express.Router();
weatherRoute.get("/", (req, res)=> {
    res.sendFile(__dirname, + "index.html")   
})

weatherRoute.post("/", (req, res)=> {
        const city = req.body.cityName
        const appiKey = "Your API Key" 
        const unit = req.body.unit

        const url = "http://tp.cpe.fr:8083/users"
        
        let context = {
            method: 'GET'
        }
        axios.get('http://tp.cpe.fr:8083/users/').then(
            response => {
                console.log(response)
                if (response.status == '200'){
                    res.write(JSON.stringify(response.data));
                    res.send()
                    return response.data
                } else {
                    throw('error fetching user')
                }
            }
        );

        /*http.get({
            hostname: 'tp.cpe.fr:8083',
            port: 8083,
            path: '/users',
            agent: false,  // Create a new agent just for this one request
          }, (response) => {
            if (response.status == '200'){
                return response.json()
            } else {
                throw('error fetching user')
            }
          }).then((result => {
            console.log('result:',result)
        }));*/
        
        
        //http.get(url, (response)=> {
        //    response.on("data", (chunk)=> {
                //console.log(chunk)
//                console.log('ok')
                //const responseData = JSON.parse(chunk);
                //console.log(responseData)
                /*const temperature = responseData.main.temp;
                const weatherDes = responseData.weather[0].description;
                const icon = responseData.weather[0].icon;
                const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
                const cityName = responseData.name;
                res.write(`&lt;h1&gt;The weather is ${temperature} degree celsius in ${cityName} and the description is ${weatherDes} &lt;/h1&gt;`)
                res.write("&lt;img src="+ imageURL +"&gt;")*/
           //     res.write(chunk)
           //     res.send()
           // })
        //})
})
module.exports = weatherRoute