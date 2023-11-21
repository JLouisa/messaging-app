const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: { type: String, required: true },
  createdByUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdDate: { type: Date, default: Date.now },
});

// Virtual for group's URL
GroupSchema.virtual("url").get(function () {
  return `/group/${this._id}`;
});

module.exports = mongoose.model("Group", GroupSchema);
