const mongoose = require("mongoose");

const posttype = new mongoose.Schema({
  postType: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("posttype", posttype);
