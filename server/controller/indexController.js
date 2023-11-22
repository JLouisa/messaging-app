const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const UserCollection = require("../model/userModel");
const bcrypt = require("bcryptjs");
const fs = require("fs");
// const reservedUsernames = JSON.parse(fs.readFileSync(__dirname + "/reservedUsernames.json", "utf8")).reservedUsernames;

exports.homeGet = asyncHandler(async function (req, res, next) {
  res.send("Home GET");
});

exports.loginGet = asyncHandler(async function (req, res, next) {
  res.send("login GET");
});

exports.loginPost = asyncHandler(async function (req, res, next) {
  //   body("username")
  //     .notEmpty()
  //     .withMessage("Username must not be empty")
  //     .trim()
  //     .isLength({ min: 5, max: 50 })
  //     .withMessage("Username must be between 5 and 50 characters")
  //     .matches(/^[a-zA-Z0-9_]*$/)
  //     .withMessage("Username can only contain letters, numbers, and underscores")
  //     .escape();
  //   body("password").notEmpty().withMessage("Password must not be empty").trim().escape();
  res.send("login POST");
});

exports.signupGet = asyncHandler(async function (req, res, next) {
  res.send("Sign UP GET");
});

exports.signupPost = asyncHandler(async function (req, res, next) {
  res.send("Sign UP POST");
});

exports.logoutPost = asyncHandler(async function (req, res, next) {
  res.send("logout POST");
});
