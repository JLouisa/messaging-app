const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const MessageCollection = require("../model/messageModel");
const bcrypt = require("bcryptjs");
// const fs = require("fs");
// const reservedUsernames = JSON.parse(fs.readFileSync(__dirname + "/reservedUsernames.json", "utf8")).reservedUsernames;

// Direct Messages
exports.messageGet = asyncHandler(async function (req, res, next) {
  res.send("Message GET");
});

exports.messageIDGet = asyncHandler(async function (req, res, next) {
  res.send("Message ID GET");
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
