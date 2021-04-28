const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      "irejvorfrijfoiurejfflkjflkslmvkdsad21eqe3"
    );
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      location: decodedToken.location,
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed",
    });
  }
};
