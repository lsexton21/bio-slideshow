const { text } = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const biologyStudentsSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  instaName: {
    type: String,
    required: true,
  },
});

//to export this schema
module.exports = mongoose.model("BiologyStudents", biologyStudentsSchema);
