const express = require("express");
const router = express.Router();
// const snippets = require("../../views/components/snippets");
const messageController = require("../controller/messageController");

// Direct Messages
/* GET messages */
router.get("/", messageController.messageGet);

// /* POST message */
// router.post("/", messageController.messagePost);

// Group Messages
/* GET a message */
router.get("/group", messageController.groupMessage);

/* GET a message */
router.get("/group/:id", messageController.groupMessageIDGet);

/* POST message */
router.post("/group/:id", messageController.groupMessageIDPost);

/* GET users signup. */
router.put("/group/:id", messageController.groupMessagePut);

/* POST users signup. */
router.delete("/group/:id", messageController.groupMessageDelete);

// Direct Messages
/* GET a message */
router.get("/:id", messageController.messageIDGet);

/* POST a message */
router.post("/:id", messageController.messagePost);

/* GET users signup. */
router.put("/:id", messageController.messagePut);

/* POST users signup. */
router.delete("/:id", messageController.messageDelete);

module.exports = router;
