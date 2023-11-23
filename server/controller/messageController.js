const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const MessageCollection = require("../model/messageModel");
const UserCollection = require("../model/userModel");
const { creator } = require("../../config/creator");
const bcrypt = require("bcryptjs");
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
  const ID = req.params.id;
  try {
    const user = await UserCollection.findOne({ username: "adamthefirst" }).exec();
    const receiver = await UserCollection.findOne({ _id: ID }).exec();

    // Combine queries using $or operator
    const messages = await MessageCollection.find({
      $or: [
        { createdByUser: user._id, userReceiver: ID },
        { createdByUser: ID, userReceiver: user._id },
      ],
    })
      .populate("createdByUser")
      .populate("userReceiver")
      .sort({ createdDate: 1 })
      .exec();
    return res.render("components/chatMessages", { user, receiver, messages });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

exports.messagePost = [
  body("text")
    .notEmpty()
    .withMessage("Message must not be empty")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Message must be between 1 and 500 characters")
    .escape(),

  asyncHandler(async function (req, res, next) {
    console.log(`req.body`);
    console.log(req.body);
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      return res.status(400).json({
        data: {
          text: req.body.text,
          errors: errors.array(),
        },
      });
    }
    console.log("still here");
    const ID = req.params.id;
    // Create and save new message
    try {
      const { useMessage } = creator();
      const newMessage = useMessage(req.body.text, "655e330c2ae9277f6ab2a59e", ID);
      await newMessage.save();
    } catch (error) {
      return res.status(400).json({
        data: {
          text: req.body.text,
          errors: error,
        },
      });
    }
    // Search up message
    try {
      const user = await UserCollection.findOne({ username: "adamthefirst" }).exec();
      const receiver = await UserCollection.findOne({ _id: ID }).exec();

      // Combine queries using $or operator
      const messages = await MessageCollection.find({
        $or: [
          { createdByUser: user._id, userReceiver: ID },
          { createdByUser: ID, userReceiver: user._id },
        ],
      })
        .populate("createdByUser")
        .populate("userReceiver")
        .sort({ createdDate: -1 })
        .exec();

      return res.render("components/chatMessages", { user, receiver, messages });
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  }),
];

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
