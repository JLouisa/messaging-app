const express = require("express");
const router = express.Router();
const { isAuth, isVerified } = require("../../config/auth");
const indexController = require("../controller/indexController");

/* GET users listing. */
router.get("/", indexController.homeGet);

/* GET users listing. */
router.get("/home", isAuth, isVerified, indexController.home);

/* GET user login page */
router.get("/login", indexController.loginGet);

/* POST users login info. */
router.post("/login", indexController.loginPost);

/* GET users signup. */
router.get("/signup", indexController.signupGet);

/* POST users signup. */
router.post("/signup", indexController.signupPost);

/* POST users logout. */
router.get("/logout", indexController.logoutPost);

/* Get user profile. */
router.get("/profile", isAuth, isVerified, indexController.profileGet);

module.exports = router;
