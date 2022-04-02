const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const { send } = require('express/lib/response');

// @desc      Register user
// @route     POST /api/v1/auth/registrejsn
// @access    Public
exports.registrejsn = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  sendTokenResponse(user, 200, res);
  res
    .status(200)
    .json({success:true, token});   
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email & password
  if(!email || !password){
    return next(new ErrorResponse('Provide an email and password!', 400));
  };

  //User check
  const user = await User.findOne({email:email}).select('+password');
  if(!user){
    return next(new ErrorResponse('Invalid credentials', 401));
  };

  //Check passwords match
  const isMatch = await user.matchPasswords(password);
  if(!isMatch){
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);

  res
    .status(200)
    .json({success:true, token});   
});

// Tokenizacija i cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly:true
  };

  // check env
  if (process.env.NODE_ENV ==='production'){
    options.secure = true;
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success:true,
      token
    });
}

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private

exports.getMe = asyncHandler(async (req, res, next) =>{
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success:true,
    data: user
  });
  
})