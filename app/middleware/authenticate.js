require("dotenv").config(); // Indlæs miljø-variabler (.env environment variabler)
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies?.authToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized to do that" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = authenticate;
