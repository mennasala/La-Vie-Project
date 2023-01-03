const roleModel = require("../../db/models/role_model");
const myHelper = require("../helper");
class Role {
  static addRole = async (req, res) => {
    try {
      const newRole = new roleModel(req.body);
      await newRole.save();
      myHelper.sendResponse(res, 200, true, newRole, "success");
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };
}
module.exports = Role;
