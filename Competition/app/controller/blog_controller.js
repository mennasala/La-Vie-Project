const blogModel = require("../../db/models/bolgs_model");
const userModel = require("../../db/models/user_model");
const myHelper = require("../helper");
const mongoose = require("mongoose");

class Blog {
  static addBlog = async (req, res) => {
    try {
      const blogData = new blogModel({ userId: req.user._id, ...req.body });
      await blogData.save();
      myHelper.sendResponse(res, 200, true, blogData, "added");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static addComment = async (req, res) => {
    try {
      const blogData = await blogModel.findById(
        mongoose.Types.ObjectId(req.params.id)
      );
      const userName = req.user.fName + " " + req.user.lName;
      blogData.comments.push({
        userId: req.user._id,
        user_name: userName,
        ...req.body.comments,
      });
      await blogData.save();
      const user = await userModel.findById(blogData.userId);
      console.log(user);
      user.notifications.push({
        notification: `${userName} has commented on Your Blog ${blogData.about}`,
      });
      await user.save();
      myHelper.sendResponse(res, 200, true, blogData, "added");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static showAllBlogs = async (req, res) => {
    try {
      const blogData = await blogModel.find();
      myHelper.sendResponse(
        res,
        200,
        true,
        blogData,
        "Fetched all blogs successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static searchBlog = async (req, res) => {
    try {
      const blogData = await blogModel.find(req.body);
      myHelper.sendResponse(
        res,
        200,
        true,
        blogData,
        "Fetched all blogs successfully"
      );
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  //delete single
  static deleteSingle = async (req, res) => {
    try {
      let blog = await blogModel.findOneAndDelete({ id: req.params.id });
      if (blog == null) throw new Error("blog Not Found");

      myHelper.sendResponse(res, 200, true, blog, "Blog deleted successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  //delete all
  static deleteAll = async (req, res) => {
    try {
      await blogModel.deleteMany();
      myHelper.sendResponse(res, 200, true, "", "Blog deleted successfully");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };


}

module.exports = Blog;
