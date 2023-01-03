const userModel = require("../../db/models/user_model");
const myHelper = require("../helper");
const path = require("path");
const fs = require("fs");
class User {
  static all = async (req, res) => {
    try {
      const users = await userModel.find();
      //console.log(users);
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

static forgetPassword=async(req,res)=>{
  
}

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
      //req.user , req.token
      req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
      await req.user.save();
      myHelper.sendResponse(res, 200, true, null, "logged out");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  static logOutAll = async (req, res) => {
    try {
      //req.user , req.token
      req.user.tokens = [];
      await req.user.save();
      myHelper.sendResponse(res, 200, true, null, "logged out");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  /*static getSingle = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) throw new Error("User not found");
      myHelper.sendResponse(res, 200, true, user, "successfully ");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };*/
  /*static changeStatus = async (req, res) => {
    try {
      let user = req.user;
      if (!req.query.current || req.query.current == "0")
        user = await userModel.findById(req.body._id);

      if (req.query.activate == "1") user.status = true;
      else user.status = false;
      await user.save();
      myHelper.sendResponse(res, 200, true, user, "updated");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };*/

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
  /*static singleAddress = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user || !user.adresses)
        throw new Error("This user not found or has no address");
      myHelper.sendResponse(
        res,
        200,
        true,
        user.adresses,
        "found user address successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };*/
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

      // res.send({
      //   ...req.body,
      //   file: newImageName,
      // });
      myHelper.sendResponse(res, 200, true, req.user, "uploaded successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };
  static editProfile = async (req, res) => {
    try {
      let user = req.user;
      /*console.log(user);
      if (!req.query.current || req.query.current == "0") {
        user = await userModel.findById(req.body._id);
      }*/
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
  /*static deleteProfile = async (req, res) => {
    try {
      let user;
      if (!req.query.current || req.query.current == "0") {
        user = await userModel.findByIdAndDelete(req.body._id);
      } else {
        user = await userModel.findByIdAndDelete(req.user._id);
      }

      myHelper.sendResponse(res, 200, true, user, "updated successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };*/
}
module.exports = User;
