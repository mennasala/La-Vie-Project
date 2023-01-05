const router = require("express").Router();
const Role = require("../app/controller/role_controller");

const auth = require("../app/midleware/auth_midleware");
const role_auth = require("../app/midleware/role_midleware");

router.post("/addRole",auth,role_auth, Role.addRole);

module.exports = router;
