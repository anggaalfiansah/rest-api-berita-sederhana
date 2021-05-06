const mongodb = require("mongoose");

const NewsModel = new mongodb.Schema({
  Judul: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
  Poster: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const NewsData = mongodb.model("News", NewsModel);

module.exports = NewsData;