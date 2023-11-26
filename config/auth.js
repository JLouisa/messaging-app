const jwt = require("jsonwebtoken");

module.exports = {
  // Verify token
  isAuth: function (req, res, next) {
    // Get auth header Value
    const bearerHeader = req.headers["authorization"];
    // Format of token
    // Authorization: Bearer <access_token>
    //Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      //Forbidden
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      return next();
    } else {
      return res.sendStatus(403);
    }
  },
  isVerified: function (req, res, next) {
    jwt.verify(req.token, process.env.SECRET_JWT_KEY, { expiresIn: "168h" }, (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(404).json({ msg: "Invalid token" });
      }
      req.body.isAdmin = decoded.user.isAdmin;
      req.body.id = decoded.user.id;
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
