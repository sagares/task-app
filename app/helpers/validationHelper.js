var User = require('../models/user');
var config = require('../../config/database');
var jwt = require('jwt-simple');

var getToken =  function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

var helpers = {

    getUser: function(req, res, callback) {
        var token = getToken(req.headers);
        if(token && token !== null) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                userName: decoded.userName
            }, function (err, user) {
                callback(err, user);
            });
        }else{
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }
    }
}
module.exports = helpers;