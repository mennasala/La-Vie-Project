const userModel = require("../../db/models/user_model");
const blogModel = require("../../db/models/bolgs_model");
const plantSeedModel = require("../../db/models/plants_seeds_model");
const myHelper = require("../helper");

const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

class User {
  static all = async (req, res) => {
    try {
      const users = await userModel.find();
      myHelper.sendResponse(
        res,
        200,
        true,
        users,
        "requested all users successfully"
      );
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  static register = async (req, res) => {
    try {
      if (
        req.body.fName.split(" ").length > 1 ||
        req.body.lName.split(" ").length > 1
      )
        throw new Error("first and last name must not exceed 2 words");
      const newUser = new userModel(req.body);
      await newUser.save();
      myHelper.sendResponse(res, 200, true, newUser, "success");
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  static login = async (req, res) => {
    try {
      const userData = await userModel.loginUser(
        req.body.email,
        req.body.password,
        req.body.account
      );
      const token = await userData.generateToken();
      myHelper.sendResponse(
        res,
        200,
        true,
        { user: userData, token },
        "successfully logged in"
      );
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };

  static forgetPassword = async (req, res) => {};

  static profile = (req, res) => {
    myHelper.sendResponse(
      res,
      200,
      true,
      { user: req.user },
      "user profile fetched"
    );
  };
  static logOut = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
      await req.user.save();
      myHelper.sendResponse(res, 200, true, null, "logged out");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  static logOutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      myHelper.sendResponse(res, 200, true, null, "logged out");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static addAdress = async (req, res) => {
    try {
      if (!req.user.adresses) req.user.adresses = [];
      req.user.adresses.push(req.body);
      await req.user.save();
      myHelper.sendResponse(
        res,
        200,
        true,
        req.user,
        "Added address successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  static allAdresses = async (req, res) => {
    try {
      const all = await req.user.adresses;
      myHelper.sendResponse(
        res,
        200,
        true,
        all,
        "fetched all addresses successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  static deleteAddress = async (req, res) => {
    try {
      const user = req.user;
      if (!user || !user.adresses)
        throw new Error("This user not found or has no address");
      user.adresses = [];
      await user.save();
      myHelper.sendResponse(
        res,
        200,
        true,
        user,
        "deleted user addresses successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  static uploadImage = async (req, res) => {
    try {
      if (!req.file) throw new Error("No file Uploaded");
      const extention = path.extname(req.file.originalname);
      const newImageName = "uploads/" + Date.now() + "test" + extention;
      req.user.image = newImageName;
      await req.user.save();
      fs.renameSync(req.file.path, newImageName);
      myHelper.sendResponse(res, 200, true, req.user, "uploaded successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  static editProfile = async (req, res) => {
    try {
      let user = req.user;
      const data = req.body;
      for (const key in data) {
        user[key] = data[key];
      }
      await user.save();
      myHelper.sendResponse(res, 200, true, user, "updated successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static bookmark = async (req, res) => {
    try {
      let user = req.user;
      user.bookMarks.push({
        name: req.params.name,
        id: req.params.id,
      });
      await user.save();
      myHelper.sendResponse(res, 200, true, user, "bookmarked successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  static showBookMarks = async (req, res) => {
    try {
      const data = [];
      const bookmarks = req.user.bookMarks;
      console.log(bookmarks);
      for (let i = 0; i < bookmarks.length; i++) {
        let Data;
        if (bookmarks[i].name == "plant" || bookmarks[i].name == "seed") {
          Data = await plantSeedModel.findById(
            mongoose.Types.ObjectId(bookmarks[i].id)
          );
        } else {
          Data = await blogModel.findById(
            mongoose.Types.ObjectId(bookmarks[i].id)
          );
        }
        data.push(Data);
      }
      myHelper.sendResponse(
        res,
        200,
        true,
        data,
        "fetched all bookmarks successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static buyPlantOrSeed = async (req, res) => {
    try {
      const plantSeed = await plantSeedModel.findById(
        mongoose.Types.ObjectId(req.params.id)
      );
      req.user.pastOrderes.push(req.params.id);
      await req.user.save();
      myHelper.sendResponse(
        res,
        200,
        true,
        plantSeed,
        `You have to pay ${plantSeed.price} dollar`
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static showPastOrders = async (req, res) => {
    try {
      const past_order = req.user.pastOrderes;
      const data = [];
      for (let i = 0; i < past_order.length; i++) {
        data.push(
          await plantSeedModel.findById(mongoose.Types.ObjectId(past_order[i]))
        );
      }
      myHelper.sendResponse(
        res,
        200,
        true,
        data,
        "Fetched All Past orders Sussessfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static deletePastOrdersFromMyProfile = async (req, res) => {
    try {
      req.user.pastOrderes = [];
      await req.user.save();
      myHelper.sendResponse(
        res,
        200,
        true,
        req.user.pastOrderes,
        "Deleted All Past orders Sussessfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static markNotificationAsRead = async (req, res) => {
    try {
      const data = req.user.notifications;
      const notification = data.find((obj) => obj._id == req.params.id);
      notification.read = true;
      await req.user.save();

      myHelper.sendResponse(
        res,
        200,
        true,
        notification,
        "Notification Marked as read successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static markAllNotificationsAsRead = async (req, res) => {
    try {
      const allNotifications = req.user.notifications;
      for (let i = 0; i < allNotifications.length; i++) {
        allNotifications[i].read = true;
      }

      await req.user.save();
      myHelper.sendResponse(
        res,
        200,
        true,
        allNotifications,
        "All Notifications Marked as read successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static deleteAllNotifications = async (req, res) => {
    try {
       req.user.notifications=[]
      await req.user.save();

      myHelper.sendResponse(
        res,
        200,
        true,
        "",
        "All Notifications deleted successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
}
module.exports = User;
