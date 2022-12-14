const axios = require("axios");
const APP_KEY = "YOUR_APP_KEY_HERE";
const zipCodeURL = 'https://www.zipcodeapi.com/rest/';
exports.find = (req,res,callback) =>{
 let URL = zipCodeURL + APP_KEY
 + '/distance.json/' + req.params.zipcode1 + '/'
 + req.params.zipcode2 + '/km';
 axios.get(URL)
 .then((response) => {
 console.log(response.data);
 console.log(response.status);
 console.log(response.statusText);
 console.log(response.headers);
 console.log(response.config);
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