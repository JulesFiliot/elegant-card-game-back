const distance = require('../service/distance');

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

exports.getDistance = (req,res)=>{
 distance.find(req,res,(error,data)=>{
    if (error){
    res.send({distance: -1});
    }else{
    res.send(data);
    }
 });
};