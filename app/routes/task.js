var express = require('express');
var router = express.Router();
var Helper = require('../helpers/validationHelper');

function getTodos(res) {
    res.send({'success': true, 'todos': []});
};

// get all todos
router.get('/', function (req, res) {
    // use mongoose to get all todos in the database
    Helper.getUser(req, res, function (err, user) {
        if (err) throw err;
        if (user) {
            getTodos(res);
        } else {
            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        }
    });
});

// create todo and send back all todos after creation
router.post('/', function (req, res) {

    // create a todo, information comes from AJAX request from Angular
    Task.create({
        text: req.body.text,
        done: false
    }, function (err, task) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        getTodos(res);
    });

});

// delete a todo
router.delete('/:todo_id', function (req, res) {
    Task.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err)
            res.send(err);

        getTodos(res);
    });
});

module.exports = router;