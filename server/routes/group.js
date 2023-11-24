const express = require("express");
const router = express.Router();
// const snippets = require("../../views/components/snippets");
const groupController = require("../controller/groupController");

/* GET group */
router.get("/", groupController.groupGet);

/* GET group */
router.get("/add", groupController.groupAddGet);

/* GET a group */
router.get("/:id", groupController.groupIDGet);

/* POST group */
router.post("/", groupController.groupPost);

/* GET group */
router.put("/:id", groupController.groupPut);

/* POST group */
router.delete("/:id", groupController.groupDelete);

module.exports = router;
