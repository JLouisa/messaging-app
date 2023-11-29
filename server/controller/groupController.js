const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const MessageCollection = require("../model/messageModel");
const GroupCollection = require("../model/groupModel");
const UserCollection = require("../model/userModel");
const FriendlistCollection = require("../model/friendlistModel");
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

exports.groupAddMemberIDGet = asyncHandler(async function (req, res, next) {
  const ID = req.params.id;
  return res.render("components/AddMember", { groupID: ID });
});

exports.groupAddMemberIDPost = [
  body("member")
    .notEmpty()
    .withMessage("No Username given")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters")
    .custom(async (value, { req }) => {
      try {
        const friendlist = await FriendlistCollection.findOne({ createdByUser: req.body.user._id })
          .populate("friends")
          .exec();

        const isFriend = friendlist.friends.some((item) => item.username === value.toLowerCase());

        if (!isFriend) {
          throw new ValidationError("You are not friends");
        }
      } catch (error) {
        if (error instanceof ValidationError) {
          throw error;
        } else {
          throw new ValidationError("An unexpected error occurred. Please try again later.");
        }
      }
    })
    .withMessage("You are not friends")
    .custom(async (value, { req }) => {
      try {
        const group = await GroupCollection.findOne({ _id: req.params.id }).populate("members").exec();
        const isGroup = group.members.some((item) => item.username === value.toLowerCase());

        if (isGroup) {
          throw new ValidationError("Friend is already in the group");
        }
      } catch (error) {
        if (error instanceof ValidationError) {
          throw error;
        } else {
          throw new ValidationError("An unexpected error occurred. Please try again later.");
        }
      }
    })
    .withMessage("Friend is already in the group")
    .escape(),

  asyncHandler(async function (req, res, next) {
    const groupID = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("components/AddMember", {
        groupID,
        username: req.body.member,
        errors: errors.array(),
      });
    }

    try {
      const user = await UserCollection.findOne({ username: req.body.member.toLowerCase() });
      const group = await GroupCollection.findOne({ createdByUser: req.body.user._id });
      group.members.push(user._id);
      await group.save();
      return res.render("components/AddMember", {
        username: req.body.member,
        succes: { msg: `Friend added to group` },
      });
    } catch (error) {
      console.error("Error adding friend:", error);

      return res.render("components/AddMember", {
        username: req.body.member,
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
