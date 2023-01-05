const router = require("express").Router();

const plantSeed = require("../app/controller/plants_seeds_controller");
const auth = require("../app/midleware/auth_midleware");
const role_auth = require("../app/midleware/role_midleware");

router.post("/addPlantOrSeed", auth, role_auth, plantSeed.addPlantOrSeed);
router.patch("/addReview/:id",auth,plantSeed.addReview)
router.get("/showReview/:id",auth,plantSeed.showAllReviewsOfPlantOrSeed)
router.get("/search",auth,plantSeed.searchPlanOrSeed)
router.get("/shops",auth,plantSeed.searchShopsThatContainSpecificPlanOrSeed)
module.exports = router;
