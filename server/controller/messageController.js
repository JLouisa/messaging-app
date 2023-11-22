const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const MessageCollection = require("../model/messageModel");
const UserCollection = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { find } = require("../model/userModel");
// const fs = require("fs");
// const reservedUsernames = JSON.parse(fs.readFileSync(__dirname + "/reservedUsernames.json", "utf8")).reservedUsernames;

// Direct Messages
exports.messageGet = asyncHandler(async function (req, res, next) {
  const user = req.body.user;
  try {
    const messages = await UserCollection.find({ user: user }).sort({ createdDate: -1 }).exec();
    res.send("Message ID GET", messages);
  } catch (error) {
    console.log(error);
    return res.send("error getting all messgages");
  }
});

exports.messageIDGet = asyncHandler(async function (req, res, next) {
  const ID = req.params.ID;
  try {
    const messages = await MessageCollection.findOne({ createdByUser: ID, userReceiver: req.body.receiver })
      .sort({ createdDate: -1 })
      .exec();
    return res.send("Message GOTTEN", messages);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
  // return res.send("Message GET", message);
});

exports.messagePost = asyncHandler(async function (req, res, next) {
  res.send("Message POST");
});

exports.messagePut = asyncHandler(async function (req, res, next) {
  res.send("Message PUT");
});

exports.messageDelete = asyncHandler(async function (req, res, next) {
  res.send("Message DELETE");
});

// Group Messages
exports.groupMessage = asyncHandler(async function (req, res, next) {
  res.send("Group Message GET");
});

exports.groupMessageIDGet = asyncHandler(async function (req, res, next) {
  res.send("Group Message ID GET");
});

exports.groupMessagePost = asyncHandler(async function (req, res, next) {
  res.send("Group Message POST");
});

exports.groupMessagePut = asyncHandler(async function (req, res, next) {
  res.send("Group Message PUT");
});

exports.groupMessageDelete = asyncHandler(async function (req, res, next) {
  res.send("Group Message DELETE");
});
