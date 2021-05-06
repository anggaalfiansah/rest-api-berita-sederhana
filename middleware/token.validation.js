const jwt = require("jsonwebtoken");

exports.authentication = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, "randomString", (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      console.log;
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};