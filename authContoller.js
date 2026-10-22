import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Farmer from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";

//farmer

export const farmerRegister = catchAsyncError(async (req, res, next) => {
  const farmerExists = await Farmer.findOne({ email: req.body.email });
  if (farmerExists) {
    return next(new ErrorHandler("User already exists", 409));
  }

  const password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  req.body.password = hashedPassword;

  const newfarmer = new Farmer(req.body);

  const token = jwt.sign({ id: newfarmer._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const savedfarmer = await newfarmer.save();

  res.status(200).send({
    message: "User account created successfully",
    success: true,
    token: token,
    user: savedfarmer,
  });
});

export const farmerLogin = catchAsyncError(async (req, res, next) => {
  // Validate input
  if (!req.body.email || !req.body.password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  const farmer = await Farmer.findOne({ email: req.body.email });

  if (!farmer) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = bcrypt.compareSync(req.body.password, farmer.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  if (!process.env.JWT_SECRET) {
    return next(new ErrorHandler("JWT_SECRET is not configured on the server", 500));
  }

  const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({
    message: "Login successful",
    success: true,
    token: token,
    user: farmer,
  });
});
