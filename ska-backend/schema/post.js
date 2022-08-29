const mongoose = require("mongoose");

const Properties = new mongoose.Schema({
  prop: {
    type: String,
  },
  value: {
    type: String,
  },
});
const PropertiesGE = new mongoose.Schema({
  prop: {
    type: String,
  },
  value: {
    type: String,
  },
});
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

  properties: [Properties],
  propertiesGE: [PropertiesGE],

  mainImage: {
    type: String,
    required: true,
  },
  images: [Images],
});
const PostSchema = new mongoose.Schema({
  PostType: {
    type: String,
    required: true,
  },
  Posts: [Posts],
});
module.exports = mongoose.model("products", PostSchema);
