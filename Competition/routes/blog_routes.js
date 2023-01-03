const router = require("express").Router();

const { showAllBlogs } = require("../app/controller/blog_controller");
const blog = require("../app/controller/blog_controller");
const auth = require("../app/midleware/auth_midleware");
const role_auth = require("../app/midleware/role_midleware");

router.post("/addBlog", auth, role_auth, blog.addBlog);
router.patch("/addComment/:id",auth,blog.addComment)
router.get("/showBlogs",auth,showAllBlogs)
module.exports = router;
