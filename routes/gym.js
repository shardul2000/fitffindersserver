const express = require("express");
const router = express.Router();
const { middleware } = require("../middleware/auth")

const{ createPostController, getPostsController, getGymListingsController, getGymDetailsController,createGymListingController } = require('../controllers/gym');

router.route("/createPost").post(middleware,createPostController);
router.route("/getPosts/:gym").get(middleware,getPostsController);
router.route("/getGymListings").get(getGymListingsController);
router.route("/getGymDetails/:gym").get(middleware, getGymDetailsController);
router.route("/createGymListing").post(middleware,createGymListingController);

module.exports = router;