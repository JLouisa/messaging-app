const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { isAuth, isVerified } = require("../../config/auth");

/* GET all users */
router.get("/", isAuth, isVerified, userController.usersGet);

/* GET add users */
router.get("/add", isAuth, isVerified, userController.userAddGet);

/* GET cancel add users */
router.get("/cancel", isAuth, isVerified, userController.userCancelGet);

/* DELETE user */
// router.delete("/:id", isAuth, isVerified, userController.usersDelete);

//Friendlist

/* GET user friendlist*/
router.get("/friendlist", isAuth, isVerified, userController.usersFriendlistGet);

/* GET user friendlist in Profile */
router.get("/friendlist/profile", isAuth, isVerified, userController.usersProfileFriendlistGet);

/* GET user */
router.get("/friendlist/add", isAuth, isVerified, userController.usersFriendlistAddGet);

/* GET user friend request */
router.get("/friendlist/pending", isAuth, isVerified, userController.usersFriendlistPendingGet);

/* POST user */
router.post("/friendlist/add", isAuth, isVerified, userController.usersFriendlistAddPost);

/* PUT user */
router.put("/friendlist/:id", isAuth, isVerified, userController.usersFriendlistIDPut);

/* DELETE user */
router.delete("/friendlist/pending/:id", isAuth, isVerified, userController.usersFriendlistDelete);

// User
/* GET all users */
router.get("/:id", isAuth, isVerified, userController.usersIDGet);

/* PUT user info change */
router.put("/:id", isAuth, isVerified, userController.usersPut);

/* PUT user info change */
router.delete("/unfriend/:id", isAuth, isVerified, userController.usersUnfriendDelete);

module.exports = router;
