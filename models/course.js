const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Add the course title']
    },
    description:{
        type: String,
        required: [true, 'Add description']
    },

    weeks: {
        type: String,
        required: [true, 'Add number of weeks']
    },
    tuition:{
        type: String,
        required: [true, 'Add a tuition cost']
    },

    minimumSkill:{
        type: String,
        required: [true, 'Add minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },

    scholarshipAvailable:{
        type: Boolean,
        default: false
    },

    createdAt:{
        type: Date,
        default: Date.now
    },

    bootcamp:{
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required = true
    }
});

module.exports = mongoose.model('Course', CourseSchema);