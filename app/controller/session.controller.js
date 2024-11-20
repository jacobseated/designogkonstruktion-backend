require("dotenv").config(); // Indlæs miljø-variabler (.env environment variabler)
const bcrypt = require("bcrypt"); // Brugt til password hashing
const jwt = require("jsonwebtoken"); // Brugt til at signere tokens når brugeren succesfuldt logger ind

const db = require("../model");
const User = db.User;

exports.login = async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    const user = await db.User.findOne({ where: { user_name } });

    // Sammenlign det indtastede kodeord med den gemte password-hash
    if (!user || !(await bcrypt.compare(user_password, user.user_password))) {
      return res.status(401).json({ error: "Invalid credentials" }); // Retuner en 401 fejl, hvis brugeren eks indtaster et forkert kodeord
    }

    const token = jwt.sign(
      { id: user.user_id, username: user.user_name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    // Hvis der opstår en anden, ukendt fejl, så ende en 500 - Internal Server Error
    return res.status(500).json({ error: "An error occurred during login" });
  }
};

exports.logout = (req, res) => {
  // I vores front-end kode skal vi håndtere denne besked, og slette vores sessions-ID fra browseren, og derved logges brugeren ud.
  res.json({ message: "Logged out successfully" });
};

exports.check = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ session: decoded });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
