const pool = [];

exports.pool = (req,res,callback) => {
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
};

exports.cancelPool = (req,res,callback) => {
    let user_id = req.params.userId;
    if (pool.includes(user_id)) {
        pool.splice(pool.findIndex(id => id == user_id),1);
        res.send("user removed from the pool")
        //maybe use the notifier in the future
    } else {
        res.send("user is not in the pool");
    }
};