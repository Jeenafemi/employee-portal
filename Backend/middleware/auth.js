const jwt = require("jsonwebtoken");

const ensureAuthorised = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        status: 0,
        msg: "No token provided"
      });
    }

    // optional: handle "Bearer token"
    const actualToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // attach user info to request
    req.user = decoded; // { id: ... }

    next();

  } catch (err) {
    return res.status(401).json({
      status: 0,
      msg: "Invalid token"
    });
  }
};

module.exports = ensureAuthorised;