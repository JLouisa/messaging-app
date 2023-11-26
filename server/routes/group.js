const express = require("express");
const router = express.Router();
const { isAuth, isVerified } = require("../../config/auth");
const groupController = require("../controller/groupController");

/* GET group */
router.get("/", isAuth, isVerified, groupController.groupGet);

/* GET group */
router.get("/add", isAuth, isVerified, groupController.groupAddGet);

/* GET a group */
router.get("/:id", isAuth, isVerified, groupController.groupIDGet);

/* POST group */
router.post("/", isAuth, isVerified, groupController.groupPost);

/* GET group */
router.put("/:id", isAuth, isVerified, groupController.groupPut);

/* POST group */
router.delete("/:id", isAuth, isVerified, groupController.groupDelete);

module.exports = router;
