var express = require('express');
var config = require('../../config');
var verify = require('../../libs/verify');
var tokenData = require('../../libs/getTokenData');
var router = express.Router();
var Task = require('../../schemas/TaskSchema');

router.get('/tasks', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            Task.find({}, function(err, post) {
                if (err)
                    res.status(404).json({error: "not found"});
                else
                    res.status(200).json(post)

            })
        }
    })
});

router.get('/tasks/user', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            Task.find({
                Completed: id
            }, function(err, post) {
                if (err)
                    res.status(404).json({error: "not found"});
                else
                    res.status(200).json(post)

            })
        }
    })
});

router.get('/tasks/users', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            Task.find({
                Assigned: id
            }, function(err, post) {
                if (err)
                    res.status(404).json({error: "not found"});
                else
                    res.status(200).json(post)

            })
        }
    })
});

router.post('/tasks', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.taskName, req.body.taskPriority, req.body.taskCompleted) {
                var task = new Task({
                    TaskName: req.body.taskName,
                    TaskDescription: req.body.taskDescription,
                    Priority: req.body.taskPriority,
                    Assigned: id,
                    Completed: req.body.taskCompleted
                });
                task.save(function(err, newTask) {
                    if (err)
                        res.status(400).json({error: "Error add task"});
                    else
                        res.status(200).json(newTask);
                    }
                )
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});

// router.put('/tasks', function(req, res) {
//     verify(req.headers.authorization, function(err, id) {
//         if (err)
//             res.status(404).json({error: auth_error});
//         else {
//             if (req.body.postID) {
//                 Post.findByIdAndUpdate(req.body.postID, {
//                     $set: {
//                         PostName: req.body.postName
//                     }
//                 }, {
//                     new: true
//                 }, function(err, post) {
//                     if (err)
//                         res.status(400).json({error: "Error update post"})
//                     else
//                         res.status(200).json(post);
//                     }
//                 )
//             } else
//                 res.status(400).json({error: "Bad request"});
//             }
//         })
// });

router.put('/tasks/changeDeadline', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.taskID && req.body.taskDeadline) {
                Task.findByIdAndUpdate(req.body.taskID, {
                    $set: {
                        Deadline: req.body.taskDeadline
                    }
                }, {
                    new: true
                }, function(err, post) {
                    if (err)
                        res.status(400).json({error: "Error update post"})
                    else
                        res.status(200).json(post);
                    }
                )
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});

router.put('/tasks/changeStatus', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.taskID && req.body.taskStatus) {
                Task.findByIdAndUpdate(req.body.taskID, {
                    $set: {
                        Status: req.body.taskStatus
                    }
                }, {
                    new: true
                }, function(err, post) {
                    if (err)
                        res.status(400).json({error: "Error update post"})
                    else
                        res.status(200).json(post);
                    }
                )
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});

router.put('/tasks/changePriority', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.taskID && req.body.taskPriority) {
                Task.findByIdAndUpdate(req.body.taskID, {
                    $set: {
                        Priority: req.body.taskPriority
                    }
                }, {
                    new: true
                }, function(err, post) {
                    if (err)
                        res.status(400).json({error: "Error update post"})
                    else
                        res.status(200).json(post);
                    }
                )
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});

router.delete('/tasks', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.taskID) {
                Task.deleteOne({
                    _id: req.body.taskID
                }, function(err, result) {
                    if (err)
                        res.status(400).json({error: "Error delete task"});
                    else
                        res.status(200).json(result);
                    }
                );
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});
module.exports = router;
