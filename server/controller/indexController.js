const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const UserCollection = require("../model/userModel");
const FriendlistCollection = require("../model/friendlistModel");
const GroupCollection = require("../model/groupModel");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const { creator } = require("../../config/creator");
const jwt = require("jsonwebtoken");
// const reservedUsernames = JSON.parse(fs.readFileSync(__dirname + "/reservedUsernames.json", "utf8")).reservedUsernames;

//! Home page
exports.homeGet = asyncHandler(async function (req, res, next) {
  res.render("pages/login", { title: "Welcome" });
});

//! Home page
exports.home = asyncHandler(async function (req, res, next) {
  res.render("pages/home", { title: "Hompage" });
});

//! Home page
exports.loginGet = asyncHandler(async function (req, res, next) {
  res.render("pages/login", { title: "Log in" });
});

//! Home page
exports.loginPost = [
  body("username")
    .notEmpty()
    .withMessage("Username must not be empty")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Username must be between 5 and 50 characters")
    .matches(/^[a-zA-Z0-9_]*$/)
    .withMessage("Username can only contain letters, numbers, and underscores")
    .custom(async (value, { req }) => {
      try {
        // Check if the username is in the database
        const user = await UserCollection.findOne({ username: value.toLowerCase() });
        if (!user) {
          throw new Error("Username is wrong or doesn't exsist.");
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
          throw new Error("Incorrect password");
        }
      } catch (error) {
        // Handle the error gracefully
        if (error.message === "Username is wrong or doesn't exsist.") {
          // Specific error for duplicate username
          throw new Error("Username is wrong or doesn't exsist.");
        }
        // Handle the error gracefully
        else if (error.message === "Incorrect password") {
          // Specific error for duplicate username
          throw new Error("Incorrect password");
        } else {
          // Handle other errors, log them, or rethrow if needed
          console.error("Error checking username:", error);
          throw new Error("An unexpected error occurred. Please try again later.");
        }
      }
    })
    .withMessage("Username or password is wrong.")
    .escape(),
  body("password").notEmpty().withMessage("Password must not be empty").trim().escape(),

  asyncHandler(async function (req, res, next) {
    console.log(req.body);
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    console.log(`errors.array()`);
    console.log(errors.array());

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      const newErrors = errors.array();
      return res.render("pages/loginError", { title: "Welcome", errors: newErrors, user: req.body.username });

      // return res.status(400).json({
      //   // username: req.body.username,
      //   error: "Error signing in",
      //   // error: errors.array(),
      // });
    } else {
      try {
        const user = await UserCollection.findOne({ username: req.body.username.toLowerCase() }).exec();
        const friendlist = await FriendlistCollection.findOne({ createdByUser: user._id })
          .populate("friends")
          .populate("groups")
          .exec();

        res.render("pages/home", { title: "Welcome", user, friendlist });
        // res.status(200).json({ user, friendlist });
      } catch (error) {
        res.status(400).json({ error });
      }
      // jwt.sign({ user: user }, process.env.SECRET_JWT_KEY, { algorithm: "RS256" }, (err, token) => {
      //   console.log(token);
      //   res.json({
      //     token: token,
      //   });
      // });
      // res.send("logout POST");
    }
  }),
];

//! Home page
exports.signupGet = asyncHandler(async function (req, res, next) {
  res.render("pages/signup", { title: "Sign-up Page" });
});

//! Validate Sign Up post
exports.signupPost = [
  // Validate and sanitize the name field.
  body("username")
    .notEmpty()
    .withMessage("Username must not be empty")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Username must be between 5 and 50 characters")
    .matches(/^[a-zA-Z0-9_]*$/)
    .withMessage("Username can only contain letters, numbers, and underscores")
    .custom(async (value) => {
      try {
        // Check if the username is in the database
        const user = await UserCollection.findOne({ username: value.toLowerCase() });

        if (user) {
          throw new Error("Username is already taken.");
        }
      } catch (error) {
        // Handle the error gracefully
        if (error.message === "Username is already taken.") {
          // Specific error for duplicate username
          throw new Error("Username is already taken. Please choose a different one.");
        } else {
          // Handle other errors, log them, or rethrow if needed
          console.error("Error checking username:", error);
          throw new Error("An unexpected error occurred. Please try again later.");
        }
      }
    })
    .withMessage("Username is unavailable. Please try again")
    .escape(),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords doesn't match"),
  body("password")
    .notEmpty()
    .withMessage("Password must not be empty")
    .trim()
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{3,20}$/)
    .withMessage(
      "Password must include at least one letter, one digit, one special character, and be between 3 and 20 characters"
    )
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async function (req, res, next) {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.status(400).json({
        data: {
          username: req.body.username,
          errors: errors.array(),
        },
      });
      return;
    } else {
      const { useUser } = creator();
      (await useUser(req.body.username, req.body.password)).save().catch((err) => console.error(err));
      res.status(201).json({ message: "User succesfully created" });
    }
  }),
];

//! Home page
exports.logoutPost = asyncHandler(async function (req, res, next) {
  res.send("logout POST");
});
