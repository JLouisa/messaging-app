const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const MessageCollection = require("../model/messageModel");
const bcrypt = require("bcryptjs");
// const fs = require("fs");
// const reservedUsernames = JSON.parse(fs.readFileSync(__dirname + "/reservedUsernames.json", "utf8")).reservedUsernames;

exports.groupGet = asyncHandler(async function (req, res, next) {
  res.send("Group GET");
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
