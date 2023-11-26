const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const MessageCollection = require("../model/messageModel");
const GroupCollection = require("../model/groupModel");
const bcrypt = require("bcryptjs");
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
  res.send("Group GET");
});

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
