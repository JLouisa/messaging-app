const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const MessageSchema = new Schema({
  text: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  createdByUser: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required."] },
  userReceiver: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required."] },
  isHidden: { type: Boolean, default: false },
});

// Virtual for message's URL
MessageSchema.virtual("url").get(function () {
  return `/message/${this._id}`;
});

MessageSchema.virtual("createdDate_formatted").get(function () {
  return DateTime.fromJSDate(this.createdDate).toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
});

module.exports = mongoose.model("Message", MessageSchema);
