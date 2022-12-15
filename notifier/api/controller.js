const notification = require('../service/notification');

exports.notify = (req,res) => {
    notification.notify(req,res,(error,data) => {
    if (error) {
            res.send("error");
        } else {
            res.send(data);
        }
    });
}