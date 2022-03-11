const express = require('express');
const { route } = require('express/lib/application');
const {getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../controllers/courses');
const Course = require('../models/course');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router({mergeParams: true});

router
    .route('/')
    .get(advancedResults(Course,{
        path: 'bootcamp',
        select: 'name description'
    }),
    getCourses)
    .post(addCourse);

router
    .route('/:id')
    .get(getCourse)
    .put(updateCourse)
    .delete(deleteCourse);


module.exports = router;