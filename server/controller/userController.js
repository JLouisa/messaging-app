const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const UserCollection = require("../model/userModel");
const FriendlistCollection = require("../model/friendlistModel");
const bcrypt = require("bcryptjs");
// const fs = require("fs");
// const reservedUsernames = JSON.parse(fs.readFileSync(__dirname + "/reservedUsernames.json", "utf8")).reservedUsernames;

exports.usersGet = asyncHandler(async function (req, res, next) {
  res.send("Users GET");
});

exports.userAddGet = asyncHandler(async function (req, res, next) {
  res.render("components/friendOrGroup");
  // res.render("components/addFriendForm");
});

exports.userCancelGet = asyncHandler(async function (req, res, next) {
  res.render("components/cancelAdd");
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

// Get friendlist
exports.usersFriendlistGet = asyncHandler(async function (req, res, next) {
  const friendlist = await FriendlistCollection.findOne({ createdByUser: "655e330c2ae9277f6ab2a59e" })
    .populate("friends")
    .exec();

  // res.send("<p>Test</p>");
  res.render("components/friendlist", { friendlist });
});

// Add friend to list Form
exports.usersFriendlistAddGet = asyncHandler(async function (req, res, next) {
  res.render("components/addFriendForm");
});

exports.usersFriendlistAddPost = [
  body("addNewFriend")
    .notEmpty()
    .withMessage("Username must not be empty")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters")
    .custom(async (value) => {
      try {
        const user = await UserCollection.findOne({ username: value.toLowerCase() });

        if (!user) {
          throw new ValidationError("Username is wrong or doesn't exist.");
        }
      } catch (error) {
        throw new ValidationError("An unexpected error occurred. Please try again later.");
      }
    })
    .escape(),

  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("components/addFriendForm", { username: req.body.addNewFriend, errors: errors.array() });
    }

    try {
      const friendlist = await FriendlistCollection.findOne({ createdByUser: "655e330c2ae9277f6ab2a59e" })
        .populate("friends")
        .exec();

      const isFriend = friendlist.friends.some((item) => item.username === req.body.addNewFriend);

      if (isFriend) {
        return res.render("components/addFriendForm", {
          username: req.body.addNewFriend,
          errors: [{ msg: "You are already friends" }],
        });
      }

      const youUser = await UserCollection.findOne({ _id: "655e330c2ae9277f6ab2a59e" }).exec();
      const userFriend = await UserCollection.findOne({ username: req.body.addNewFriend.toLowerCase() }).exec();
      const userFriendlist = await FriendlistCollection.findOne({ createdByUser: userFriend._id })
        .populate("friends")
        .exec();

      friendlist.friends.push(userFriend);
      userFriendlist.friends.push(youUser);

      await friendlist.save();
      await userFriendlist.save();

      return res.render("components/addFriendUpdate", { title: "Welcome", friendlist, user: youUser });
    } catch (error) {
      console.error("Error adding friend:", error);

      return res.render("components/addFriendForm", {
        username: req.body.addNewFriend,
        errors: [{ msg: "Something went wrong. Please try again" }],
      });
    }
  }),
];

exports.usersFriendlistPut = asyncHandler(async function (req, res, next) {
  res.send("User friendlist PUT");
});

exports.usersFriendlistDelete = asyncHandler(async function (req, res, next) {
  res.send("User friendlist POST");
});
