require("dotenv").config(); // Indlæs miljø-variabler (.env environment variabler)
const bcrypt = require("bcrypt"); // Brugt til password hashing
const jwt = require("jsonwebtoken"); // Brugt til at signere tokens når brugeren succesfuldt logger ind
const community = require("./../model/community");

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
      return res
        .status(400)
        .json({ message: "Brugernavn eller kodeord mangler!" });
    }

    // Forsøg at foretage en: SELECT * FROM users WHERE user_fullname = 'user_fullname'
    user = await userRepository.findOne({
      where: { user_mail },

      include: {
        model: community,

        // through: Hvilke kolonner skal med fra vores junction tabel? Tom = ingen.
        //          bemærk, hvis vi fjerner denne vil hele junction tabellen blive inkluderet i
        //          den retunerede data under en "communityMembership" property. Lav evt console.log() for at se strukturen!
        //          Her har jeg valgt at skjule alting i communityMembership, fordi det er kun community indholdet vi vil have med ud
        through: {
          attributes: [],
        },
      },
    });

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
      return res
        .status(401)
        .json({ message: "Ugyldigt brugernavn eller kodeord!" }); // Retuner en 401 fejl, hvis brugeren eks indtaster et forkert kodeord
    }

    // Om stateless autentificering:
    // Vi opretter en token ved hjælp af vores JWT_SECRET (en vilkårlig men meget lang og hemmelig tekst-streng vi gemmer i .env filen)
    // På den måde kan brugeren logge ind, uden at vi behøver at huske eller gemme deres "token", og derved spare vi plads på serveren.
    // Vi bruger vores JWT_SECRET både til at generere nye- og validere eksisterende tokens ved login. Her opretter vi en ny token:
    const token = jwt.sign(
      { 
        // Her gemmer vi de parametre, som vi ønsker at gøre tilgængelige andre steder i vores backend
        id: user.user_id,
        email: user.user_mail,
        admin: user.user_admin
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Denne token udløber efter en time
    );

    // Her sætter vi en cookie med navnet "autoToken", som vi senere kan bruge til at tjekke om brugeren er logget ind
    res.cookie("authToken", token, {
      httpOnly: true, // Til at forhindre adgang fra scripts i vores frontend (Browser afhængig, men mere sikker. Nogle browser ignorere det, og giver alligevel adgang).
      // secure: true, // HTTPS
      sameSite: "Strict", // Forhindre andre sider i at sende os authToken
      maxAge: 3600000, // Udløbstid i millisekunder (1 time)
    });

    res.json({
      user: {
        userId: user.user_id,
        fullname: user.user_fullname,
        email: user.user_mail,
        communities: user.communities,
      },
    }); // Send en simpel 200 status, sammen med detaljer om den indloggede bruger
  } catch (err) {
    // Noget helt andet, uventet, gik galt på server-siden, og vi sender derfor en general 500 besked (vi må selv tjekke loggen, for at debugge det)
    console.error("Error during login:", err);
    // Hvis der opstår en anden, ukendt fejl, så ende en 500 - Internal Server Error
    return res.status(500).json({ message: "An error occurred during login" });
  }
};

exports.logout = (req, res) => {
  // For at logge brugeren ud kan vi slette den cookie vi satte tidligere
  res.cookie("authToken", "", {
    httpOnly: true,
    sameSite: "Strict",
    expires: new Date(0), // Udløb omgående
  });
  res.json({ message: "Logged out successfully" });
};

exports.check = async (req, res) => {
  let decoded;
  const token = req.cookies?.authToken;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Tjek om token stadig er gyldig
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  // Forsøg at foretage en: SELECT * FROM users WHERE user_id = 'user_id'
  try {
    const user_id = decoded.id;
    user = await userRepository.findOne({
      where: { user_id },
      include: {
        model: community,
        through: {
          attributes: [],
        },
      },
    });

    // Hvis user er tom.
    if (!user) {
      return res.status(401).json({ message: "Brugeren blev ikke fundet" });
    }

    // Send detaljerne tilbage til klientens
    res.json({
      user: {
        userId: user.user_id,
        fullname: user.user_fullname,
        email: user.user_mail,
        communities: user.communities,
      },
    });
  } catch (err) {
    // Hvis alt ovenstående fejler, så antag at brugeren ikke blev fundet
    return res.status(404).json({ message: "Brugeren blev ikke fundet" });
  }


};
