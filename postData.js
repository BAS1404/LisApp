const mongoose = require("./libs/mongoose");
var Departaments = require('./schemas/UserSchema');

Departaments.find({},function(err,result){
    console.log(result);
})
