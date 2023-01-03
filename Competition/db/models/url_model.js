const mongoose = require("mongoose");

const urlsSchema = mongoose.Schema({
  url: {
    type: String,
  },
  method: {
    type: String,
  }, 
  roles: [
    {
      roleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
});

urlsSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  return data;
};
const Url = mongoose.model("Url", urlsSchema);
module.exports = Url;
