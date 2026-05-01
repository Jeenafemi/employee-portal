const jwt = require("jsonwebtoken");

const ensureAuthorised = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        status: 0,
        msg: "No token provided",
      });
    }

    const actualToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      status: 0,
      msg: "Invalid token",
    });
  }
};

module.exports = ensureAuthorised;
