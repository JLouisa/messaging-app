const express = require("express");
const router = express.Router();
// const snippets = require("../../views/components/snippets");
const indexController = require("../controller/indexController");

/* GET users listing. */
router.get("/", indexController.homeGet);

/* GET user login page */
router.get("/login", indexController.loginGet);

/* POST users login info. */
router.post("/login", indexController.loginPost);

/* GET users signup. */
router.get("/signup", indexController.signupGet);

/* POST users signup. */
router.post("/signup", indexController.signupPost);

/* POST users logout. */
router.post("/logout", indexController.logoutPost);

// /* POST users logout. */
// router.post("/logout", function (req, res, next) {
//   res.render("pages/about", { head: "About", title: "About" });
// });

// /* GET user login. */
// router.get("/login", userController.login);

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("pages/index", { description: "Your description here", head: "Home", title: "Welcome" });
// });

// router.get("/about", function (req, res, next) {
//   res.render("pages/about", { head: "About", title: "About" });
// });

// router.post("/clicked-ping", function (req, res, next) {
//   res.render("components/ping", { name: "Ping", layout: false });
// });

// router.post("/clicked-pong", function (req, res, next) {
//   res.render("components/pong", { name: "Pong", layout: false });
// });

// router.post("/clicked-ping", function (req, res, next) {
//   res.send(snippets.ping);
// });

// router.post("/clicked-pong", function (req, res, next) {
//   res.send(snippets.pong);
// });

// router.post("/clicked", function (req, res, next) {
//   res.send("<h1>Clicked</h1>");
// });

module.exports = router;
