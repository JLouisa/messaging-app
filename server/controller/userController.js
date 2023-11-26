const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const UserCollection = require("../model/userModel");
const FriendlistCollection = require("../model/friendlistModel");
const mongoose = require("mongoose");
const { creator } = require("../../config/creator");
const { startSession } = require("mongoose");
const bcrypt = require("bcryptjs");
// const fs = require("fs");
// const reservedUsernames = JSON.parse(fs.readFileSync(__dirname + "/reservedUsernames.json", "utf8")).reservedUsernames;

//? Dev User ID
// const { req.body.user._id } = require("../../config/req.body.user._id");

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
  const friendlist = await FriendlistCollection.findOne({ createdByUser: req.body.user._id })
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
      const myFriendlist = await FriendlistCollection.findOne({ createdByUser: req.body.user._id })
        .populate("friends")
        .exec();

      const isFriend = myFriendlist.friends.some((item) => item.username === req.body.addNewFriend);

      if (isFriend) {
        return res.render("components/addFriendForm", {
          username: req.body.addNewFriend,
          errors: [{ msg: "You are already friends" }],
        });
      }

      const meTheUser = await UserCollection.findOne({ _id: req.body.user._id }).exec();
      const userFriend = await UserCollection.findOne({ username: req.body.addNewFriend.toLowerCase() }).exec();
      const userFriendlist = await FriendlistCollection.findOne({ createdByUser: userFriend._id })
        .populate("pending")
        .exec();

      const isPending = userFriendlist.pending.some((item) => item._id === req.body.user._id);

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
  const friendlist = await FriendlistCollection.findOne({ createdByUser: req.body.user._id })
    .populate("friends")
    .exec();

  // res.send("<p>Test</p>");
  res.render("components/profileFriendsList", { friendlist });
});

// Get pending list in profile
exports.usersFriendlistPendingGet = asyncHandler(async function (req, res, next) {
  try {
    const pendingList = await FriendlistCollection.findOne({ createdByUser: req.body.user._id })
      .populate("pending")
      .exec();
    res.render("components/pendingList", { pendingList: pendingList });
  } catch (error) {
    console.log("Something went wrong getting the pending list", error);
    res.send("<p>Something went wrong getting the pending list</p>");
  }
});

//! PUT Friendlist
exports.usersFriendlistIDPut = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;

  try {
    // Start Atomic Operations
    const session = await mongoose.startSession();
    // session.startTransaction();
    await session.withTransaction(async () => {
      const [myUser, theUser] = await Promise.all([
        UserCollection.findOne({ _id: req.body.user._id }).session(session),
        UserCollection.findOne({ _id: ID }).session(session),
      ]);

      const [myFriendlist, userFriendlist] = await Promise.all([
        FriendlistCollection.findOne({ createdByUser: req.body.user._id }).populate("pending").session(session).exec(),
        FriendlistCollection.findOne({ createdByUser: ID }).populate("pending").session(session).exec(),
      ]);

      const fr = myFriendlist.pending.filter((friend) => {
        return friend._id.toString() === theUser._id.toString();
      });

      const restFr = myFriendlist.pending.filter((friend) => {
        return friend._id.toString() !== theUser._id.toString();
      });

      // Update user friendlist
      myFriendlist.friends.push(fr[0]._id);

      // Update user pending list
      myFriendlist.pending = [...restFr];

      // Update friend's friendlist
      userFriendlist.friends.push(myUser._id);

      // Save to database
      await myFriendlist.save();
      await userFriendlist.save();

      res.render("components/pendingList", { pendingList: myFriendlist });
    });

    // Commit and end the transaction
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    // Handle errors and perform rollback
    console.error("Transaction error:", error);

    // Rollback the transaction
    await session.abortTransaction();
    session.endSession();

    // Handle the error
    console.log("Something went wrong with accepting the friend request", error);
    res.send("Something went wrong accepting");
  }
});

exports.usersFriendlistDelete = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  try {
    const userFriendlist = await FriendlistCollection.findOne({ createdByUser: req.body.user._id });
    const newPendingList = userFriendlist.pending.filter((friend) => {
      return friend._id.toString() !== ID;
    });

    // Update user pending list
    userFriendlist.pending = [...newPendingList];

    console.log(`userFriendlist.pending`);
    console.log(userFriendlist.pending);

    // Save to database
    await userFriendlist.save();

    res.render("components/pendingList", { pendingList: userFriendlist });
  } catch (error) {
    console.log("Something went wrong with removing friend request", error);
  }
});
