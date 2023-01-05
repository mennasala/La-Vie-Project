const mongoose = require("mongoose");

const PalntsSeedsSchema = mongoose.Schema({
  type: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    enum: ["plant", "seed"],
  },
  category: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },

  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  about: {
    type: String,
    trim: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Ease_of_cultivation: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  }, 
  reviews: [
    {
      user_name: {
        type: String,
        trim: true,
        lowercase: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
      },
      review: {
        type: String,
        trim: true,
        lowercase: true,
      },
    },
  ],
});

const PalntsSeeds = mongoose.model("PalntsSeeds", PalntsSeedsSchema);
module.exports = PalntsSeeds;
