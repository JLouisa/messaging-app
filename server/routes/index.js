const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("pages/index", { head: "Home", title: "Welcome" });
});

router.get("/about", function (req, res, next) {
  res.render("pages/about", { head: "About", title: "About" });
});

module.exports = router;
