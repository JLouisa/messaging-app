const express = require("express");
const router = express.Router();
const { isAuth, isVerified } = require("../../config/auth");
const messageController = require("../controller/messageController");

//! Direct Messages
/* GET messages */
router.get("/", isAuth, isVerified, messageController.messageGet);

//! Group Messages
/* GET a message */
router.get("/group", isAuth, isVerified, messageController.groupMessage);

/* GET a message */
router.get("/group/:id", isAuth, isVerified, messageController.groupMessageIDGet);

/* POST message */
router.post("/group/:id", isAuth, isVerified, messageController.groupMessageIDPost);

/* GET users signup. */
router.put("/group/:id", isAuth, isVerified, messageController.groupMessagePut);

/* POST users signup. */
router.delete("/group/:id", isAuth, isVerified, messageController.groupMessageDelete);

//! Direct Messages
/* GET a message */
router.get("/:id", messageController.messageIDGet);

/* POST a message */
router.post("/:id", messageController.messagePost);

/* GET users signup. */
router.put("/:id", messageController.messagePut);

/* POST users signup. */
router.delete("/:id", messageController.messageDelete);

module.exports = router;
