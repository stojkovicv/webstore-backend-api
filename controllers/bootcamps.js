const Bootcamp = require('../models/Bootcamps');
const express = require('express');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public  
exports.getBootcamps = asyncHandler(async (req, res, next) => {

        const bootcamps = await Bootcamp.find();
        res
        .status(200)
        .json({success:true, data:bootcamps});    

        res.status(400).json({ success:false });
        
});


// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public  
exports.getBootcamp = asyncHandler(async (req, res, next) => {

        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp){
            return next(new ErrorResponse (`Bootcamp not found with id of ${req.params.id}`,400))
        }

        res.status(200).json({ success:true, data:bootcamp });
});


// @desc    Create bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private  
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
        success: true,
        data: bootcamp        
    });

});


// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private  
exports.updateBootcamp = asyncHandler(async (req, res, next) => {

        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true});
    
            if(!bootcamp){
                return new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400);
            }
            res.status(200).json({success:true, data:bootcamp});

});


// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private  
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    
            if(!bootcamp){
                return new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400);
            }
            res.status(200).json({  success:true, data:{}  });
});