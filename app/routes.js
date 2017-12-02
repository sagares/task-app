var User = require('./models/user');
var config = require('../config/database');
var jwt = require('jwt-simple');
var category = require('./routes/category');
var task = require('./routes/task');
// pass passport for configuration
var passport = require('passport');
require('../config/passport')(passport);


module.exports = function (app) {

    app.post('/api/signup', function (req, res) {
        var newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            categories: []
        });

        newUser.save(function (err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful! Created new user. Proceed to login.'});
        });
    });

    app.post('/api/authenticate', function (req, res) {
        User.findOne({userName: req.body.userName}, function (err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                res.send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.encode(user, config.secret);
                        // return the information including token as JSON
                        res.json({success: true, token: 'JWT ' + token});
                    } else {
                        res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                });
            }
        });
    });

    //Using category router module for handling category routes
    app.use('/api/categories', category);

    //Using tasks router module for handling tasks routes
    app.use('/api/tasks', task)

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
