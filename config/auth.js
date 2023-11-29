const jwt = require("jsonwebtoken");

module.exports = {
  // Verify token
  isAuth: function (req, res, next) {
    // Get auth cookie Value
    const cookie = req.headers.cookie;
    // Format of token
    //Check if cookie is undefined
    if (typeof cookie !== "undefined") {
      //Forbidden
      const token = cookie.slice(13);
      req.token = token;
      return next();
    } else {
      // return res.status(401).json({ error: "Unauthorized - No token provided" });

      // No token provided, initiate client-side redirect to /login
      // return res.redirect(201, "/login");
      return res.set("HX-Redirect", "/login").status(401).end();
    }
  },
  isVerified: function (req, res, next) {
    jwt.verify(req.token, process.env.SECRET_JWT_KEY, { expiresIn: "168h" }, (err, decoded) => {
      if (err || decoded.user.isSuspended === true) {
        console.log("There was an isVerified error");
        console.error(err);
        // return res.redirect(201, "/login");
        return res.render("components/login", { notLoggedIn: true });
      }
      req.body.user = {
        _id: decoded.user._id,
        username: decoded.user.username,
        isAdmin: decoded.user.isAdmin,
        isSuspended: decoded.user.isSuspended,
      };
      next();
    });
  },
  isAdmin: function (req, res, next) {
    jwt.verify(req.token, process.env.SECRET_JWT_KEY, { expiresIn: "168h" }, (err, decoded) => {
      if (err) {
        return res.sendStatus(405);
      } else {
        if (decoded.user.isAdmin === true && decoded.user.isSuspended === false) {
          req.body.id = decoded.user.id;
          next();
        } else {
          return res.sendStatus(401);
        }
      }
    });
  },
  isMember: function (req, res, next) {
    jwt.verify(req.token, process.env.SECRET_JWT_KEY, { expiresIn: "168h" }, (err, decoded) => {
      if (err) {
        return res.status(406).json({ msg: "Invalid token" });
      } else {
        if (decoded.user.isSuspended === false) {
          req.body.id = decoded.user.id;
          next();
        } else {
          return res.sendStatus(401);
        }
      }
    });
  },
};
