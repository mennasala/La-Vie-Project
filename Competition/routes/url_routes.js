const router = require("express").Router();
const Url = require("../app/controller/url_controller");

router.post("/addUrl", Url.addUrl);

module.exports = router;
