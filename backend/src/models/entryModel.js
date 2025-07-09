// models/Entry.js
const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference User model
      required: true,
    },
    date: { type: Date, required: true },
    title: String,
    mood: {
      type: String,
      enum: ["🙂", "😔", "😡"],
    },
    content: String,
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
  },
  { timestamps: true }
);

const Entry = mongoose.model("Entry", entrySchema);
module.exports = Entry;
