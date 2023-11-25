const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

/* GET all users */
router.get("/", userController.usersGet);

/* GET add users */
router.get("/add", userController.userAddGet);

/* GET cancel add users */
router.get("/cancel", userController.userCancelGet);

/* DELETE user */
router.delete("/:id", userController.usersDelete);

//Friendlist

/* GET user friendlist*/
router.get("/friendlist", userController.usersFriendlistGet);

/* GET user friendlist in Profile */
router.get("/friendlist/profile", userController.usersProfileFriendlistGet);

/* GET user */
router.get("/friendlist/add", userController.usersFriendlistAddGet);

/* GET user friend request */
router.get("/friendlist/pending", userController.usersFriendlistPendingGet);

/* POST user */
router.post("/friendlist/add", userController.usersFriendlistAddPost);

/* PUT user */
router.put("/friendlist/:id", userController.usersFriendlistIDPut);

/* DELETE user */
router.delete("/friendlist/pending/:id", userController.usersFriendlistDelete);

// User
/* GET all users */
router.get("/:id", userController.usersIDGet);

/* PUT user info change */
router.put("/:id", userController.usersPut);

module.exports = router;
