const matchmaking = require('../service/matchmaking');

exports.pool = (req,res)=>{
    matchmaking.pool(req,res,(error,data)=>{
        if (error){
            res.send("error");
        }else{
            console.log(data)
            res.send(data);
        }
    })
}

exports.cancelPool = (req,res)=>{
    matchmaking.cancelPool(req,res,(error,data)=>{
        if (error){
            res.send("error");
        }else{
            console.log(data)
            res.send(data);
        }
    })
}