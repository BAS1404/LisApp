var express = require('express');
var config = require('../../config');
var verify = require('../../libs/verify');
var router = express.Router();
var User = require('../../schemas/UserSchema');

// Получение списка всех пользователей

router.get('/users', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            User.find({}, function(err, users) {
                if (err)
                    res.status(404).json({error: "not found"});
                else
                    var users_data = [];
                users.forEach(function(user) {
                    users_data.push({userId: user._id, userName: user.FullName});
                });
                res.status(200).json(users_data)
            })
        }
    })
});

// Получение списка пользователей по отделу

// router.get('/users/departament', function(req, res) {
//     verify(req.headers.authorization, function(err, id) {
//         if (err)
//             res.status(404).json({error: auth_error});
//         else {
//             if (req.body.departamentID) {
//                 User.find({
//                     Departament: req.body.departamentId
//                 }, function(err, users) {
//                     if (err)
//                         res.status(404).json({error: "not found"});
//                     else {
//                         var users_data = [];
//                         users.forEach(function(user) {
//                             users_data.push({userId: user._id, userName: user.FullName});
//                         });
//                         res.status(200).json(users_data)
//                     }
//                 })
//             } else
//                 res.status(400).json({error: "Bad request"});
//             }
//         })
// });

// Получение списка пользователей по отделу и должности

// router.get('/users/post', function(req, res) {
//     verify(req.headers.authorization, function(err, id) {
//         if (err)
//             res.status(404).json({error: auth_error});
//         else {
//             if (req.body.departament) {
//                 User.find({
//                     Departament: req.body.departamentID,
//                     Post: req.body.postID
//                 }, function(err, users) {
//                     if (err)
//                         res.status(404).json({error: "not found"});
//                     else
//                         var users_data = [];
//                     users.forEach(function(user) {
//                         users_data.push({userId: user._id, userName: user.FullName});
//                     });
//                     res.status(200).json(users_data)
//                 })
//             } else
//                 res.status(400).json({error: "Bad request"});
//             }
//         })
// });

// Получение информации пользователя

router.get('/users/:id', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.userID) {
                Post.findOne({_id: req.body.userID}).populate('Department', 'DepartmentName').populate('Post', 'PostName').exec(function(err, user) {
                    if (err)
                        res.status(404).json({error: "not found"});
                    else
                        res.status(200).json({userId: user._id, userName: user.FullName, userPhone: user.Phone, departament: user.Department.DepartmentName, post: user.Post.PostName})
                })
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});

// Создание пользователя

router.post('/users', function(req, res) {
    if (req.body.password === req.body.password2 && req.body.fullName && req.body.login && req.body.departamentID && req.body.postID) {
        var user = new User({
            FullName: req.body.fullName,
            Phone: req.body.phone,
            Login: req.body.login,
            password: req.body.password,
            Department: req.body.departamentID,
            Post: req.body.postID
        });
        user.save(function(err, newUser) {
            if (err) {
                console.log(err);
                res.status(500).json({error: "Error add post"});
            } else
                res.status(200).json(newUser);
            }
        )
    } else
        res.status(400).json({error: "Bad request"});
    }
);

// Изменение пользователя

// router.put('/users', function(req, res) {
//     verify(req.headers.authorization, function(err, id) {
//         if (err)
//             res.status(404).json({error: auth_error});
//         else {
//             Post.findByIdAndUpdate(req.body.postID, {
//                 $set: {
//                     PostName: req.body.postName
//                 }
//             }, {
//                 new: true
//             }, function(err, post) {
//                 if (err)
//                     res.status(500).json({error: "Error update post"})
//                 else
//                     res.status(200).json(post);
//                 }
//             )
//         }
//     })
// });

// Удаление пользователя

router.delete('/users', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.userID) {
                Post.deleteOne({
                    _id: req.body.userID
                }, function(err, result) {
                    if (err)
                        res.status(500).json({error: "Error delete post"});
                    else
                        res.status(200),
                        json(result);
                    }
                );
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});
module.exports = router;
