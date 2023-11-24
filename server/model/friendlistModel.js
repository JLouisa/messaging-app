const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendlistSchema = new Schema({
  createdByUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  pending: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Virtual for friendlist's URL
FriendlistSchema.virtual("url").get(function () {
  return `/friendlist/${this._id}`;
});

module.exports = mongoose.model("Friendlist", FriendlistSchema);
