const axios = require("axios");

const starting_ap = 15;
var attack_cost = 5;

var duel_info = {
    "testId":{
    user_1_id:"",
    user_2_id:"",
    turn:1,
    user_1_ap:0,
    user_2_ap:0,
    user_1_card_ids:[],
    user_1_cards_info:[],
    user_2_card_ids:[],
    user_2_cards_info:[]
}};

function gameOver(req,res) {
    // send winner to notifier
//    duel_info[req.body.duelId].turn
}

exports.init = (req,res,callback) => {
    let duel_id = Math.trunc(Math.random()*1000);
    duel_info[duel_id]={
        state: 'choose_cards',
        player_1: {
            id: req.body.userId1
        },
        player_2: {
            id: req.body.userId2
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
    let cards_info_url = 'http://vps.cpe-sn.fr:8083/cards'
    axios.get(cards_info_url).then((response)=>{
        console.log(response.data.filter((c) => card_ids.includes(c.id)))
        if (user_id==duel_info[duel_id].user_1_id){
            duel_info[duel_id].user_1_card_ids = response.data.filter((c) => card_ids.includes(c.id))
        } else if (user_2_id==duel_info.user_2_id){
            duel_info[duel_id].user_2_card_ids = response.data.filter((c) => card_ids.includes(c.id))
        } else {
            //ERROR, this user is not part of the duel
        }
        // send duel_info to notifier
        if (duel_info[duel_id].user_1_card_ids && duel_info[duel_id].user_2_card_ids) {
            //start duel
            duel_info[duel_id].state = "fighting";
            Math.random()<0.5 ? duel_info[duel_id].turn = 1 : duel_info[duel_id].turn = 2;
        }
        return("processing card choice");
        //res.send("processing card choice")
    });

};

exports.attack = (req,res,callback) => {
    //req contains duelId, attCardId & defCardId
    
    //if user AP allows it, do the HP calculus for cards
    if (duel_info[req.body.duelId]['turn']==1){
        let att_card = duel_info[req.body.duelId].user_1_cards_info.find(card => card.id == req.body.attCardId)
        attack_cost = att_card.energy;
        if (duel_info[req.body.duelId].user_1_ap > attack_cost) {
            //substract ap from user and hp from def card
            duel_info[req.body.duelId].user_1_ap-attack_cost;
            duel_info[req.body.duelId].user_2_cards_info.forEach(function(card, i) {
                if (card.id == req.body.defCardId) {
                    damage = att_card.attack - card.defence;
                    if (damage > 0) {
                        duel_info[req.body.duelId].user_2_cards_info[i].hp -= damage;
                    }
                    if (duel_info[req.body.duelId].user_2_cards_info[i].hp <= 0) {
                        return gameOver(req,res);
                    }
                }
            });
        } ;
    } else {
        let att_card = duel_info[req.body.user_2_cards_info].find(card => card.id == req.body.attCardId)
        if (duel_info[req.body.duelId].user_2_ap > 3) {
            //substract ap from user and hp from def card
            duel_info[req.body.duelId].user_2_ap-attack_cost;
            duel_info[req.body.duelId].user_1_cards_info.forEach(function(card, i) {
                if (card.id == req.body.defCardId) {
                    damage = att_card.attack - card.defence;
                    if (damage > 0) {
                        duel_info[req.body.duelId].user_1_cards_info[i].hp -= damage;
                    }
                    if (duel_info[req.body.duelId].user_1_cards_info[i].hp <= 0) {
                        return gameOver(res);
                    }
                }
            });
        }
    }

    //send duel_info to notifier
    return("processing attack");
//    res.send("processing attack");
};

exports.endTurn = (req,res,callback) => {
    //req contains duel_id

    //reset user AP, and change turn
    if (duel_info[req.body.duelId]['turn']==1){
        duel_info[req.body.duelId].user_1_ap = starting_ap;
        duel_info[req.body.duelId]['turn']=2;
    } else {
        duel_info[req.body.duelId].user_2_ap = starting_ap;
        duel_info[req.body.duelId]['turn']=1;
    }
    callback("",duel_info[req.body.duelId]);
    //send duel_info to notifier
};

exports.getDuelInfo = (req,res,callback) => {
    console.log('client getting duel info')
    //res.send("ok")
    callback("",duel_info[req.body.duelId]);
};