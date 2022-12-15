const axios = require("axios");
const { response } = require("express");

//const axios = require("axios");
const APP_KEY = "YOUR_APP_KEY_HERE";
const zipCodeURL = 'https://www.zipcodeapi.com/rest/';


//think about data storing format
var duel_info = {};


/*exports.find = (req,res,callback) =>{
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
};*/

exports.init = (req,res,callback) => {
    let duel_id = Math.trunc(Math.random()*1000);
    duel_info[duel_id]={
        state: 'choose_cards',
        player_1: {
            id: req.params.userId1
        },
        player_2: {
            id: req.params.userId2
        },
    };
    //request to notifier "user must choose cards"    
};

exports.chooseCards = (req,res,callback) => {
    //duel_id = req.params.duelId;
    console.log('-------------')
    let duel_id = req.body.duelId;
    let user_id = req.body.userId;
    let card_ids = req.body.cardIds;
    //console.log(card_ids.include(3))
    //card_ids = card_ids.join();
    console.log(duel_id,typeof card_ids,card_ids.includes("8"))
    let arr = ["1","2","3"]
    console.log(typeof arr, arr.includes(2))

    // add request to UserService to check if user really possesses the cards

    // add request to CardService to get info about chosen cards
    let cards_info_url = 'http://tp.cpe.fr:8083/cards'
    axios.get(cards_info_url).then((response)=>{
        console.log(response.data.filter((c) => card_ids.includes(c.id)))
    });

};

exports.attack = (req,res,callback) => {
    duel_info = {};
};