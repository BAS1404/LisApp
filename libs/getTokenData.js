var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../schemas/UserSchema');
module.exports = (token, func) => {
    if (token) {
        jwt.verify(token, config.get('session:secret'), function(err, decoded) {
            if (decoded)
                func(null, decoded);
            else
                func("No token", null)
        })
    }
}
