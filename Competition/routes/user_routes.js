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

router.patch("/bookmark/:name/:id", auth, User.bookmark);
router.get("/showBookMarks", auth, User.showBookMarks);

router.patch("/buy/:id", auth, User.buyPlantOrSeed);
router.get("/showPastOrders", auth, User.showPastOrders);
router.patch("/deletePastOrders", auth, User.deletePastOrdersFromMyProfile);

router.patch("/markNotificationAsRead/:id", auth, User.markNotificationAsRead);
router.patch(
  "/markAllNotificationsAsRead",
  auth,
  User.markAllNotificationsAsRead
);
router.patch("/deleteAllNotifications", auth, User.deleteAllNotifications);

module.exports = router;
