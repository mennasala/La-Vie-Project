const mongoose = require("mongoose");

const roleScema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
}); 
roleScema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  return data;
};
const Role = mongoose.model("Role", roleScema);
module.exports = Role;
