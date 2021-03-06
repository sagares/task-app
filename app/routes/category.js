var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Helper = require('../helpers/validationHelper');
var UserHelper = require('../helpers/userHelper');

//Add a new category to the list
router.post('/', function (req, res) {
    Helper.getUser(req, res, function (err, user) {
        if (err) throw err;
        if (user) {
            var found = user.categories.find(function (category) {
                return category.title === req.body.title;
            });
            if (found) {
                return res.json({success: false, msg: 'Category already present.'});
            }
            user.categories.push({title: req.body.title, tasks: []});
            user.save(function (err) {
                if (err) {
                    return res.json({success: false, msg: 'Error while adding category.'});
                }
                res.json({success: true, categories: user.categories});
            });
        } else {
            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        }
    });
});

//Return all the categories
router.get('/', function (req, res) {
    Helper.getUser(req, res, function (err, user) {
        if (err) throw err;
        if (user) {
            res.send({success: true, categories: user.categories})
        } else {
            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        }
    });
});

//Resturn a category based on id
router.get('/:id', function(req, res){
   Helper.getUser(req, res, function(err, user){
       if (err) throw err;
       if (user) {
           UserHelper.getCategoryById(user._id, req.params.id, function(err, category){
               if(err) throw err;
               if(category){
                   return res.json({success: true, category: category});
               } else {
                   return res.json({success: false, msg: 'Category with this id not found.'});
               }
           });
       } else {
           return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
       }
   })
});
//Deletes an category based on the id
router.delete('/:id', function(req, res){
   Helper.getUser(req, res, function(err, user){
       if (err) throw err;
       if(user){
           //delete from mongodb
           User.update({_id: user._id}, {"$pull":{"categories":{"_id": req.params.id}}}, { safe: true, multi:true }, function(err, obj){
              if(err)
               throw err;
              if(obj) {
                  if(obj.ok) {
                      Helper.getUser(req,res, function(er, user){
                          if(err) throw err;
                          res.send({success: true, categories: user.categories});
                      });
                  } else {
                      res.send({success: false, msg: 'Error while deleting'});
                  }
              }
           });

       } else {
           return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
       }
   })
});

module.exports = router;