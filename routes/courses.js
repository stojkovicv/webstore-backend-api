const express = require('express');
const { route } = require('express/lib/application');
const {getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../controllers/courses');
const Course = require('../models/course');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router({mergeParams: true});
const {protect} = require('../middleware/auth');


router
    .route('/')
    .get(advancedResults(Course,{
        path: 'bootcamp',
        select: 'name description'
    }),
    getCourses)
    .post(protect, addCourse);

router
    .route('/:id')
    .get(getCourse)
    .put(protect, updateCourse)
    .delete(protect, deleteCourse);


module.exports = router;