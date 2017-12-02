var express = require('express');
var router = express.Router();
var Helper = require('../helpers/validationHelper');
var UserHelper = require('../helpers/userHelper');
var User = require('../models/user');

function addTaskToCategory(userId, categoryId, task, callback) {
    User.update({_id: userId, "categories._id": categoryId},
        {"$push": {"categories.$.tasks": task}}, {safe: true, new: true}, function (err, doc) {
            if (err) throw err;
            if (doc && doc.ok) {
                callback(null, {isAdded: true})
            } else {
                callback(new Error("Category not found"), null);
            }
        });
}


// create task and send back all todos after creation
router.post('/', function (req, res) {
    Helper.getUser(req, res, function (err, user) {
        if (err) throw err;
        if (user) {
            var task = {
                title: req.body.title,
                description: req.body.description
            };
            addTaskToCategory(user._id, req.body.categoryId, task, function (err, result) {
                if (result.isAdded) {
                    UserHelper.getCategoryById(user._id, req.body.categoryId, function (err, category) {
                        if (err) throw err;
                        if (category) {
                            return res.json({success: true, tasks: category.tasks});
                        } else {
                            return res.json({success: false, msg: 'Category with this id not found.'});
                        }
                    });
                } else {
                    res.send({success: false, msg: 'Error while deleting'});
                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        }
    });
});

// delete a task
router.delete('/:categoryId/:id', function (req, res) {
    Helper.getUser(req, res, function (err, user) {
        if (err) throw err;
        if (user) {
            User.update({_id: user._id, "categories._id": req.params.categoryId},
                {"$pull": {"categories.$.tasks": {"_id": req.params.id}}}, {safe: true, new: true}, function (err, doc) {
                    if (err) throw err;
                    if (doc && doc.ok) {
                        UserHelper.getCategoryById(user._id, req.params.categoryId, function (err, category) {
                            if (err) throw err;
                            if (category) {
                                return res.json({success: true, tasks: category.tasks});
                            } else {
                                return res.json({success: false, msg: 'Category not found.'});
                            }
                        });
                    } else {
                        return res.send({success:false, msg:'Error while deleting.'});
                    }
                });
        } else{
            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        }
    });
});

module.exports = router;