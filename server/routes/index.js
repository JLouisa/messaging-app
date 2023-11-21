const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("pages/index", { title: "Messeging App", text: "Welcome to My Messeging App" });
});

module.exports = router;
