var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../schemas/UserSchema');
module.exports = (token, func) => {
    if (token) {
        jwt.verify(token, config.get('session:secret'), function(err, decoded) {
            if (decoded){
                User.findById(decoded.id, function(err, user) {
                    if (user){
                        func(null, user._id);}
                    else
                        func("No user", null);
                    });} else
                        func("No verify", null);

                    });
                }
                else func("No token", null)
        }
