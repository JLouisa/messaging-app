const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

/* GET all users */
router.get("/", userController.usersGet);

/* GET add users */
router.get("/add", userController.userAddGet);

/* GET cancel add users */
router.get("/cancel", userController.userCancelGet);

/* GET all users */
router.get("/:id", userController.usersIDGet);

/* PUT user info change */
router.put("/:id", userController.usersPut);

/* DELETE user */
router.delete("/:id", userController.usersDelete);

//Friendlist

/* POST user */
router.get("/friendlist/add", userController.usersFriendlistAddGet);

/* POST user */
router.post("/friendlist/add", userController.usersFriendlistAddPost);

/* PUT user */
router.put("/friendlist/:id", userController.usersFriendlistPut);

/* DELETE user */
router.delete("/friendlist/:id", userController.usersFriendlistDelete);

module.exports = router;
