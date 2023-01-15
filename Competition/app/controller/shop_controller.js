const mongoose = require("mongoose");
const shopModel = require("../../db/models/shops_model");
const plantSeedModel = require("../../db/models/plants_seeds_model");
const myHelper = require("../helper");
class Shop {
  static addShop = async (req, res) => {
    try {
      const newShop = new shopModel(req.body);
      await newShop.save();
      myHelper.sendResponse(res, 200, true, newShop, "success");
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  static showSingleShop = async (req, res) => {
    try {
      const shop = await shopModel.findById(
        mongoose.Types.ObjectId(req.params.id)
      );
      const plant = [];
      for (let i = 0; i < shop.plants.length; i++) {
        const data = await plantSeedModel.findById(
          mongoose.Types.ObjectId(shop.plants[i])
        );
        plant.push(data);
      }
      const seed = [];
      for (let i = 0; i < shop.plants.length; i++) {
        const data = await plantSeedModel.findById(
          mongoose.Types.ObjectId(shop.seeds[i])
        );
        seed.push(data);
      }
      const resData = {
        Name: shop.name,
        plant,
        seed,
      };
      myHelper.sendResponse(res, 200, true, resData, "success");
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  /*static findNearestShop = async (req, res) => {
    try {
      myHelper.sendResponse(res, 200, true, resData, "success");
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };*/
}
module.exports = Shop;
