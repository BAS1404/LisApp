var mongoose = require('mongoose')
Schema = mongoose.Schema;
///Задача
var TaskSchema = Schema({
    TaskName: {
        type: String,
        required: true
    },
    TaskDescription: {
        type: String
    },
    Status: {
        type: Number,
        default: 1
    },
    Priority: {
        type: Number,
        required:true
    },
    TaskCreation: {
        type: Date,
        default: Date.now
    },
    Assigned: { ///Назначил
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    Completed: { ///Выполнил
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
});
module.exports = mongoose.model('Tasks', TaskSchema);
