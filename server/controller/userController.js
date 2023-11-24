const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const UserCollection = require("../model/userModel");
const bcrypt = require("bcryptjs");
// const fs = require("fs");
// const reservedUsernames = JSON.parse(fs.readFileSync(__dirname + "/reservedUsernames.json", "utf8")).reservedUsernames;

exports.usersGet = asyncHandler(async function (req, res, next) {
  res.send("Users GET");
});

exports.userAddGet = asyncHandler(async function (req, res, next) {
  res.render("components/addFriendForm");
});

exports.usersIDGet = asyncHandler(async function (req, res, next) {
  res.send("User GET");
});

exports.usersPut = asyncHandler(async function (req, res, next) {
  res.send("User PUT");
});

exports.usersDelete = asyncHandler(async function (req, res, next) {
  res.send("User DELETE");
});

exports.usersFriendlistAddPost = [
  body("addNewFriend")
    .notEmpty()
    .withMessage("Friend must not be empty")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Friend must be between 3 and 50 characters")
    .custom(async (value) => {
      try {
        // Check if the username is in the database
        const user = await UserCollection.findOne({ username: value.toLowerCase() });

        if (!user) {
          throw new Error("Username is wrong or doesn't exsist.");
        }
      } catch (error) {
        // Handle the error gracefully
        if (error.message === "Username is wrong or doesn't exsist.") {
          // Specific error for duplicate username
          throw new Error("Username is wrong or doesn't exsist.");
        } else {
          // Handle other errors, log them, or rethrow if needed
          console.error("Error checking username:", error);
          throw new Error("An unexpected error occurred. Please try again later.");
        }
      }
    })
    .withMessage("Username is wrong or doesn't exsist.")
    .escape(),

  asyncHandler(async function (req, res, next) {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      return res.status(400).json({
        data: {
          text: req.body.addNewFriend,
          errors: errors.array(),
        },
      });
    }
    res.send("<p>User friendlist POST</p>");
  }),
];

exports.usersFriendlistPut = asyncHandler(async function (req, res, next) {
  res.send("User friendlist PUT");
});

exports.usersFriendlistDelete = asyncHandler(async function (req, res, next) {
  res.send("User friendlist POST");
});
