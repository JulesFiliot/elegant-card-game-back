exports.notify = (req,res,callback) => {
    res.send(req.params.msg)
    return 200
};

exports.notif = (req,res, callback) => {
    let user_name = req.body.user;
    let pwd = req.body.password;
    res.send("User name = "+user_name+", password is "+pwd);
};