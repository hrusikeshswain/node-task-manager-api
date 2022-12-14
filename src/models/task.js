const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
},{
    timestamps: true
})

taskSchema.pre('save', function (next) {
    const task = this
    console.log('calling taskSchema before saving task')    

    next()
})

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;