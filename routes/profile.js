const express = require("express");
const router = express.Router();
const { middleware } = require("../middleware/auth")

const{ postReview, getReviews} = require('../controllers/profile');


router.route("/postReview").post( middleware,postReview);
router.route("/getReviews/:id").get(getReviews);



module.exports = router; 