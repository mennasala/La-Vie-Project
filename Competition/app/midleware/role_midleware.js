const roleModel = require("../../db/models/role_model");
const urlModel = require("../../db/models/url_model");
const myHelper = require("../helper");

const roleAuth = async (req, res, next) => {
  try {
    const role = await roleModel.findById(req.user.roleId);
    if (!role) throw new Error("Invalid  user role");
    req.role = role; 
    let origURL = req.originalUrl;
    const key = Object.keys(req.params);
    const value = Object.values(req.params);
    value.forEach((el, i) => {
      origURL = origURL.replace(el, ":" + key[i]);
    }); 
    const Url = await urlModel.findOne({
      url: origURL,
      method: req.method,
      "roles.roleId": role._id,
    }); 
    if (!Url) throw new Error("unAuthorized");
    next();
  } catch (err) {
    myHelper.sendResponse(res, 500, false, err, err.message);
  }
};

module.exports = roleAuth;
