require("dotenv").config(); // Indlæs miljø-variabler (.env environment variabler)
const bcrypt = require("bcrypt"); // Brugt til password hashing
const jwt = require("jsonwebtoken"); // Brugt til at signere tokens når brugeren succesfuldt logger ind

const db = require("../model");
const userRepository = db.user;

exports.login = async (req, res) => {
  // Vi skal bruge de her variabler i næste try blok, så derfor er de defineret udenfor den første (de vil ellers være "scoped" til blokken nemlig)
  let user;
  let user_mail;
  let user_password;

  try {
    ({ user_mail, user_password } = req.body);

    // Tjek om der overhovedet blev indstastet et brugernavn og kodeord
    if (!user_mail || !user_password) {
        return res.status(400).json({ message: "Brugernavn eller kodeord mangler!" });
    }

    // Forsøg at foretage en: SELECT * FROM users WHERE user_fullname = 'user_fullname'
    user = await userRepository.findOne({ where: { user_mail } });

    // Hvis user er tom. Det burde dog ikke ske
    if (!user) {
      return res.status(401).json({ message: "Brugeren blev ikke fundet" });
    }
    
  } catch (err) {
    // Hvis alt ovenstående fejler, så antag at brugeren ikke blev fundet
    return res.status(404).json({ message: "Brugeren blev ikke fundet" });
  }

  // Hvis brugeren blev fundet, så fortsæt med validering af password
  try {
    // Sammenlign det indtastede kodeord med den gemte password-hash
    if (!(await bcrypt.compare(user_password, user.user_password))) {
      return res.status(401).json({ message: "Ugyldigt brugernavn eller kodeord!" }); // Retuner en 401 fejl, hvis brugeren eks indtaster et forkert kodeord
    }

    // Om stateless autentificering:
    // Vi opretter en token ved hjælp af vores JWT_SECRET (en vilkårlig men meget lang og hemmelig tekst-streng vi gemmer i .env filen)
    // På den måde kan brugeren logge ind, uden at vi behøver at huske eller gemme deres "token", og derved spare vi plads på serveren.
    // Vi bruger vores JWT_SECRET både til at generere nye- og validere eksisterende tokens ved login. Her opretter vi en ny token:
    const token = jwt.sign(
      { id: user.user_id, email: user.user_mail },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Denne token udløber efter en time
    );

    // Her sætter vi en cookie med navnet "autoToken", som vi senere kan bruge til at tjekke om brugeren er logget ind
    res.cookie("authToken", token, {
      httpOnly: true, // Til at forhindre adgang fra scripts
      // secure: true, // HTTPS
      sameSite: "Strict", // Forhindre andre sider i at sende os authToken
      maxAge: 3600000, // Udløbstid i millisekunder (1 time)
    });

    res.json({ user: {fullname: user.user_fullname, email: user.user_mail, photo: '', communities:[]}}); // Send en simpel 200 status, sammen med detaljer om den indloggede bruger
    
  } catch (err) {
    // Noget helt andet, uventet, gik galt på server-siden, og vi sender derfor en general 500 besked (vi må selv tjekke loggen, for at debugge det)
    console.error("Error during login:", err);
    // Hvis der opstår en anden, ukendt fejl, så ende en 500 - Internal Server Error
    return res.status(500).json({ message: "An error occurred during login" });
  }
};

exports.logout = (req, res) => {
  // For at logge brugeren ud kan vi slette den cookie vi satte tidligere
  res.clearCookie("authToken", {
    httpOnly: true,
    sameSite: "Strict",
    // secure: true, // Include this if the original cookie was set with secure
  });
  res.json({ message: "Logged out successfully" });
};

exports.check = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Klienten (browseren) har givet os en token, som vi skal tjekke gyldigheden af;
  // det kan vi gøre med jwt.verify sammen med vores JWT_SECRET
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ session: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
