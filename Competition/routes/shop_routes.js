const router = require("express").Router();
const shop = require("../app/controller/shop_controller");

const auth = require("../app/midleware/auth_midleware");
const role_auth = require("../app/midleware/role_midleware");

router.post("/addShop", auth, role_auth, shop.addShop);
router.get("/showShop/:id", auth, shop.showSingleShop);

module.exports = router;
