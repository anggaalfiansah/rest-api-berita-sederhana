const mongodb = require("mongoose");

const CommentModel = new mongodb.Schema({
  NewsId: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const CommentData = mongodb.model("Comment", CommentModel);

module.exports = CommentData;