var mongoose = require('mongoose')
Schema = mongoose.Schema;
///отдел
var DepartmentSchema = Schema({
  DepartmentName: String,
})
module.exports = mongoose.model('Department', DepartmentSchema);
