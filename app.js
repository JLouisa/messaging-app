const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { connectToDatabase } = require("./config/mongDB");
// const compression = require("compression");
// const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

const crypto = require("crypto");

const indexRouter = require("./server/routes/index");
const usersRouter = require("./server/routes/users");
const messageRouter = require("./server/routes/message");
const groupRouter = require("./server/routes/group");

const app = express();

// app.use(compression());

// Init Database
connectToDatabase();

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
});
// Apply rate limiter to all requests
app.use(limiter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));

function generateNonce() {
  return crypto.randomBytes(16).toString("base64");
}
// Set the CSP header in your middleware
// app.use((req, res, next) => {
//   const nonce = generateNonce();
//   res.setHeader("Content-Security-Policy", `script-src 'self' 'nonce-${nonce}'`);
//   res.locals.nonce = nonce;
//   next();
// });

// app.use(helmet());
app.use(
  "/javascript",
  express.static("/javascript", {
    extensions: ["js"],
    setHeaders: (res, path) => {
      res.type("application/javascript");
    },
  })
);
// Set the CSP header in your middleware
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline'");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/message", messageRouter);
app.use("/group", groupRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("pages/error", { layout: false });
});

module.exports = app;
