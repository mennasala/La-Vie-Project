const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  about: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    enum: ["plant", "seed","shop"],
  },
  description: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
// plant or seed or shop name
  topic: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  }, 
  comments: [
    {
      user_name:{
        type: String,
        trim: true,
        lowercase: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      comment: {
        type: String,
        trim: true,
        lowercase: true,
      },
    },
  ],
});

const blog = mongoose.model("blog", blogSchema);
module.exports = blog;
