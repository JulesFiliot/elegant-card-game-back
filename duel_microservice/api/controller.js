const duel = require('../service/duel');

exports.initDuel = (req,res)=>{
    duel.init(req,res,(error,data)=>{
        if (error){
            res.send("error");
        }else{
            res.send(data);
        }
    })
}

exports.attack = (req,res)=>{
    duel.attack(req,res,(error,data)=>{
        if (error){
            res.send("error");
        }else{
            res.send(data);
        }
    })
}

exports.chooseCards = (req,res)=>{
    duel.chooseCards(req,res,(error,data)=>{
        if (error){
            res.send("error");
        }else{
            res.send(data);
        }
    })
}

exports.getDuelInfo = (req,res)=>{
    duel.getDuelInfo(req,res,(error,data)=>{
        if (error){
            res.send("error");
        }else{
            console.log(data)
            res.send(data);
        }
    })
}

exports.getDuelInfo = (req,res)=>{
    duel.getDuelInfo(req,res,(error,data)=>{
        if (error){
            res.send("error");
        }else{
            console.log(data)
            res.send(data);
        }
    })
}

exports.endTurn = (req,res)=>{
    duel.endTurn(req,res,(error,data)=>{
        if (error){
            res.send("error");
        }else{
            console.log(data)
            res.send(data);
        }
    })
}