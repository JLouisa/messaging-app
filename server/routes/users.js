const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

/* GET all users */
router.get("/", userController.usersGet);

/* GET all users */
router.get("/add", userController.userAddGet);

/* GET all users */
router.get("/:id", userController.usersIDGet);

/* PUT user info change */
router.put("/:id", userController.usersPut);

/* DELETE user */
router.delete("/:id", userController.usersDelete);

//Friendlist
/* POST user */
router.post("/friendlist/add", userController.usersFriendlistAddPost);

/* PUT user */
router.put("/friendlist/:id", userController.usersFriendlistPut);

/* DELETE user */
router.delete("/friendlist/:id", userController.usersFriendlistDelete);

module.exports = router;
