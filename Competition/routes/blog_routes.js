const router = require("express").Router();

const blog = require("../app/controller/blog_controller");
const auth = require("../app/midleware/auth_midleware");

router.post("/addBlog", auth, blog.addBlog);

router.get("/showBlogs", auth, blog.showAllBlogs);
router.get("/searchBlog", auth, blog.searchBlog);

router.patch("/addComment/:id", auth, blog.addComment);

router.delete("/deleteSingle/:id", auth, blog.deleteSingle);
router.delete("/deleteAll", auth, blog.deleteAll);

module.exports = router;
