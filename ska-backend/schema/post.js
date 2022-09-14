const mongoose = require("mongoose");
const Images = new mongoose.Schema({
  url: {
    type: String,
  },
});
const Posts = new mongoose.Schema({
  type: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  nameGE: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  descriptionGE: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  images: [Images],
});

module.exports = mongoose.model("post", Posts);
