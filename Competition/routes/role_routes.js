const router = require("express").Router();
const Role = require("../app/controller/role_controller");

router.post("/addRole", Role.addRole);

module.exports = router;
