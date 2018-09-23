var crypto = require('crypto');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
///пользователь
var UserSchema = Schema({
    FullName: {
        type: String,
        required: true
    },
    Phone: {
        type: String
    },
    Login: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    Department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    Post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})

UserSchema.virtual('password').set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + "";
    this.hashedPassword = this.encryptPassword(password)
}).get(function() {
    return this._plainPassword;
})

UserSchema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

UserSchema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

module.exports = mongoose.model('User', UserSchema);
