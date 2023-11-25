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
  const friendlist = await FriendlistCollection.findOne({ createdByUser: "656144192cf2499410157191" })
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
      const myFriendlist = await FriendlistCollection.findOne({ createdByUser: "656144192cf2499410157191" })
        .populate("friends")
        .exec();

      const isFriend = myFriendlist.friends.some((item) => item.username === req.body.addNewFriend);

      if (isFriend) {
        return res.render("components/addFriendForm", {
          username: req.body.addNewFriend,
          errors: [{ msg: "You are already friends" }],
        });
      }

      const meTheUser = await UserCollection.findOne({ _id: "656144192cf2499410157191" }).exec();
      const userFriend = await UserCollection.findOne({ username: req.body.addNewFriend.toLowerCase() }).exec();
      const userFriendlist = await FriendlistCollection.findOne({ createdByUser: userFriend._id })
        .populate("pending")
        .exec();

      const isPending = userFriendlist.pending.some((item) => item._id === "656144192cf2499410157191");

      if (!isPending) {
        userFriendlist.pending.push(meTheUser);
        await userFriendlist.save();
      }
      return res.render("components/addFriendUpdate", { title: "Welcome", friendlist: myFriendlist, user: meTheUser });
    } catch (error) {
      console.error("Error adding friend:", error);

      return res.render("components/addFriendForm", {
        username: req.body.addNewFriend,
        errors: [{ msg: "Something went wrong. Please try again" }],
      });
    }
  }),
];

//Get friendlist in profile
exports.usersProfileFriendlistGet = asyncHandler(async function (req, res, next) {
  const friendlist = await FriendlistCollection.findOne({ createdByUser: "656144192cf2499410157191" })
    .populate("friends")
    .exec();

  // res.send("<p>Test</p>");
  res.render("components/profileFriendsList", { friendlist });
});

// Get pending list in profile
exports.usersFriendlistPendingGet = asyncHandler(async function (req, res, next) {
  try {
    const pendingList = await FriendlistCollection.findOne({ createdByUser: "656144192cf2499410157191" })
      .populate("pending")
      .exec();
    res.render("components/pendingList", { pendingList: pendingList.pending });
  } catch (error) {
    console.log("Something went wrong getting the pending list", error);
    res.send("<p>Something went wrong getting the pending list</p>");
  }
});

exports.usersFriendlistPut = asyncHandler(async function (req, res, next) {
  res.send("User friendlist PUT");
});

exports.usersFriendlistDelete = asyncHandler(async function (req, res, next) {
  res.send("User friendlist POST");
});
