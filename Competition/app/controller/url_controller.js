const urlModel = require("../../db/models/url_model");
const myHelper = require("../helper");
class Url {
  static addUrl = async (req, res) => {
    try {
      const newUrl = new urlModel(req.body);
      await newUrl.save();
      myHelper.sendResponse(res, 200, true, newUrl, "success");
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };
}
module.exports = Url;
