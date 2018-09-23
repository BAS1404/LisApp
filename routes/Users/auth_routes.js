var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');
var verify = require('../../libs/verify');
var router = express.Router();
var User = require('../../schemas/UserSchema');

router.post('/login', function(req, res, next) {
    User.findOne({Login: req.body.login}).populate("Post").populate("Department").exec(function(err, user) {
        if (err) {
            next();
        }
        if (!user) {
            return res.status(403).json('No user found.');
        }
        if (user.checkPassword(req.body.password)) {
            var token = jwt.sign({
                id: user._id,
                departament: user.Department._id,
                post: user.Post._id
            }, config.get('session:secret'), {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).json({
                auth: true,
                token,
                user: {
                    name: user.FullName,
                    departament: user.Department.DepartmentName,
                    post: user.Post.PostName
                }
            });
        } else {
            res.status(403).json('No user found.');
        }
    });
});
router.get('/user/logout', function(req, res) {
    res.status(200).send({auth: false, token: null, username: null});
});
module.exports = router;
