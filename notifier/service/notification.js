exports.notify = (req,res,callback) =>{
    res.send(req.params.msg)
    return 200
};