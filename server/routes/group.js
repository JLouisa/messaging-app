const express = require("express");
const router = express.Router();
// const snippets = require("../../views/components/snippets");
const groupController = require("../controller/groupController");

/* GET messages */
router.get("/", groupController.groupGet);

/* GET a message */
router.get("/:id", groupController.groupIDGet);

/* POST message */
router.post("/", groupController.groupPost);

/* GET users signup. */
router.put("/:id", groupController.groupPut);

/* POST users signup. */
router.delete("/:id", groupController.groupDelete);

module.exports = router;
