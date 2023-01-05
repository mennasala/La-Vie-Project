const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({ 
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  plants:[],
  seeds:[],
});

const shops = mongoose.model("shops", shopSchema);
module.exports = shops;
