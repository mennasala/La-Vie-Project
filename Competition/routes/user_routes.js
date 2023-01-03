const router = require("express").Router();
const auth = require("../app/midleware/auth_midleware");
const role_auth = require("../app/midleware/role_midleware");
const User = require("../app/controller/user_controller");
const upload = require("../app/midleware/upload_midleware");

router.post("/register", User.register);
router.post("/login", User.login);
//logout from this device only
router.post("/logout", auth, User.logOut);
//logout all devices
router.post("/logoutAll", auth, User.logOutAll);

//show my profile
router.get("/me", auth, User.profile);
//edit my profile
router.patch("/editProfile", auth, User.editProfile);
//add address
router.post("/addAdress", auth, User.addAdress);
//delete address
router.patch("/deleteAddress", auth, User.deleteAddress);
//show all addresses
router.get("/allAdresses", auth, User.allAdresses);
router.patch(
    "/uplaodImgToProfile",
    auth,
    upload.single("mennaImage"),
    User.uploadImage
  );


router.get("/:id", auth, role_auth, User.all);

module.exports = router;
