const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

/* GET all users */
router.get("/", userController.usersGet);

/* GET all users */
router.get("/:id", userController.usersIDGet);

/* PUT user info change */
router.put("/:id", userController.usersPut);

/* DELETE user */
router.delete("/:id", userController.usersDelete);

//Friendlist
/* POST user */
router.post("/friendlist/:id", userController.usersFriendlistPost);

/* PUT user */
router.post("/friendlist/:id", userController.usersFriendlistPut);

/* DELETE user */
router.delete("/friendlist/:id", userController.usersFriendlistDelete);

// /* GET user login page */
// router.get("/login", userController.loginGet);

// /* POST users login info. */
// router.post("/login", userController.loginPost);

// /* GET users signup. */
// router.get("/signup", userController.signupGet);

// /* POST users signup. */
// router.post("/signup", userController.logoutPost);

// /* POST users logout. */
// router.post("/logout", userController.signupPost);

// // /* POST users logout. */
// // router.post("/logout", function (req, res, next) {
// //   res.render("pages/about", { head: "About", title: "About" });
// // });

module.exports = router;
