const blogModel = require("../../db/models/bolgs_model");
const myHelper = require("../helper");
const mongoose = require("mongoose");

class Blog {
  static addBlog = async (req, res) => {
    try {
      const blogData = new blogModel(req.body);
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
      blogData.comments.push(req.body.comments );
      await blogData.save();
      myHelper.sendResponse(res, 200, true, blogData, "added");
    } catch (e) {
      myHelper.sendResponse(res, 500, false, e, e.message);
    }
  };

  static showAllBlogs=async(req,res)=>{
    try {
        const blogData = await blogModel.find();
        myHelper.sendResponse(res, 200, true, blogData, "Fetched all blogs successfully");
      } catch (e) {
        myHelper.sendResponse(res, 500, false, e, e.message);
      }
  }
}

module.exports = Blog;
