const User = require("../models/Users");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//@desc Register User
//@route Get /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const userCreate = await user.create({
    name,
    email,
    password,
    role,
  });
  //create token
  sendTokenResponse(userCheck, 200, res);
});

//@desc Login User
//@route Get /api/v1/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //valdidate credentials
  if (!email || !password) {
    return new ErrorResponse("Enter credentials to login", 400);
  }

  //check for user
  const userCheck = await User.findOne({ email }).select("+password");

  if (!userCheck) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  //check password match
  const isMatch = await userCheck.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  //create token
  sendTokenResponse(userCheck, 200, res);
});

//Get token from model, create cookie and send response

const sendTokenResponse = (userCheck, statusCode, res) => {
  const token = userCheck.getSignedJwtToken();

  const options = {
    expire: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
