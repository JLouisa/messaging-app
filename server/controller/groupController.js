const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const MessageCollection = require("../model/messageModel");
const GroupCollection = require("../model/groupModel");
const bcrypt = require("bcryptjs");
const { creator } = require("../../config/creator");
const { useGroup } = creator();
// const fs = require("fs");
// const reservedUsernames = JSON.parse(fs.readFileSync(__dirname + "/reservedUsernames.json", "utf8")).reservedUsernames;

// ? Dev User ID
// const { req.body.user._id } = require("../../config/req.body.user._id");

exports.groupGet = asyncHandler(async function (req, res, next) {
  try {
    const groups = await GroupCollection.find({ members: req.body.user._id }).populate("members");
    return res.render("components/groupList", { groups });
  } catch (error) {
    console.log("There was an issue getting group", error);
    res.send("<p>Group Failed</p>");
  }
});

exports.groupAddGet = asyncHandler(async function (req, res, next) {
  res.render("components/addGroupForm");
});

// Create new Group
exports.groupAddPost = [
  body("addNewGroup")
    .notEmpty()
    .withMessage("Group must have a name")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Group name must be between 3 and 50 characters")
    .escape(),

  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("components/addGroupForm", { group: req.body.addNewGroup, errors: errors.array() });
    }

    try {
      const newGroup = useGroup(req.body.addNewGroup, req.body.user._id);
      await newGroup.save();
      const groups = await GroupCollection.find({ members: req.body.user._id }).populate("members");
      return res.render("components/groupList", { groups });
    } catch (error) {
      console.error("Error adding friend:", error);
      return res.render("components/groupList", {
        username: req.body.addNewFriend,
        errors: [{ msg: "Something went wrong. Please try again" }],
      });
    }
  }),
];

exports.groupIDGet = asyncHandler(async function (req, res, next) {
  res.send("Group ID GET");
});

exports.groupPost = asyncHandler(async function (req, res, next) {
  res.send("Group POST");
});

exports.groupPut = asyncHandler(async function (req, res, next) {
  res.send("Group PUT");
});

exports.groupDelete = asyncHandler(async function (req, res, next) {
  res.send("Group DELETE");
});
