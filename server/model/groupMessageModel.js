const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const GroupMessageSchema = new Schema({
  text: { type: String, required: true },
  createdByUser: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required."] },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isHidden: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now },
});

// Virtual for group's URL
GroupMessageSchema.virtual("url").get(function () {
  return `/group/message/${this._id}`;
});

GroupMessageSchema.virtual("createdDate_formatted").get(function () {
  return DateTime.fromJSDate(this.createdDate).toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
});

module.exports = mongoose.model("GroupMessage", GroupMessageSchema);
