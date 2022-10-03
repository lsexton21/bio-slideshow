const mongoose = require("mongoose");
const { Schema } = mongoose;

const InstaPostsSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  media_type: {
    type: String,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

//to export this schema
module.exports = mongoose.model("InstaPosts", InstaPostsSchema);
