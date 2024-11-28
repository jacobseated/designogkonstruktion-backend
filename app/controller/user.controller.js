const db = require("../model");
const bcrypt = require("bcrypt"); // Brugt til password hashing
const userRepository = db.user;

// Funktion til at hente en liste af alle brugere (GET)
// Bemærk: På en live side vil man aldrig hente alle brugerne på en gang; det vil være for belastende for serveren og browseren, og derfor henter man ud i batches
exports.findAll = async (req, res) => {
  try {
    const userList = await userRepository.findAll({
      attributes: { exclude: ["user_password"] }, // Ekskluder de her kolonner
    });
    res.json(userList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kunne ikke hente en liste af brugere" });
  }
};

// Funktion til at hente detaljerne om en enkelt bruger via user_id (GET)
exports.findOne = async (req, res) => {
  try {
    const user = await userRepository.findOne({
      where: { user_id: req.body.user_id }, // Udtag user_id fra body delen af HTTP anmodningen
      attributes: { exclude: ["user_password"] },
    });

    // Tjek om brugeren blev fundet
    if (!user) {
      return res.status(404).json({ message: "Brugeren blev ikke fundet" });
    }

    res.json(user); // Send brugeren tilbage til vores frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kunne ikke hente en liste af brugere" });
  }
};

// Funktion til at slette brugere via user_id (DELETE)
exports.delete = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Brug Sequelize's destroy method til at slette brugeren. -> DELETE FROM users WHERE user_id = user_id;
    const deletedCount = await userRepository.destroy({
      where: { user_id: user_id },
    });
    if (deletedCount === 0) {
      // Hvis brugeren ikke blev fundet, bliver der ikke slettet noget
      return res.status(404).json({ message: "Brugeren blev ikke fundet" });
    }

    // Send besked til frontend'en om at brugeren blev slettet
    res.json({ message: "Brugeren blev slettet med succes" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kunne ikke slette brugeren" });
  }
};

// Funktion til at oprette brugere (POST)
exports.create = async (req, res) => {
  try {
    // Husk: En HTTP anmodning er en slags datastrøm, hvor henholdsvis "head" og "body" er adskilt med "CRLF" (\r\n),
    //       karaktere. Head indeholder primært HTTP headers, imens body indeholder dataen.

    // Da vi har at gøre med en POST anmodning, så vil de forskellige parametre
    // være gemt i "body" delen af HTTP anmodningen. Sequelize kan automatisk pille dem ud for os ved brug af nedestående:
    const { user_fullname, user_mail, user_password, user_img, user_admin } =
      req.body; // Bemærk. Variabelnavne auto-matches med properties i HTTP body'en (JavaScript Object Destructuring syntax)

    const hashed_password = await bcrypt.hash(user_password, 10);

    // Her forsøger vi at indsætte dataen i databasen ved brug af sequelize
    await userRepository.create({
      user_fullname,
      user_mail,
      user_password: hashed_password,
      user_img,
      user_admin,
    });

    // Send svaret tilbage til klienten (Eks. cURL, POSTMAN eller vores Frontend)
    res.status(201).json({message:'Brugeren blev oprettet!'});
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Kunne ikke oprette brugeren" });
  }
};

// Funktion til at opdatere en bruger (PATCH)
exports.update = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_password, ...otherFields } = req.body;

    // Find brugeren via ID
    const user = await userRepository.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return 404 if the user does not exist
    }

    // Vi opdatere dynamisk et objekt af data, som er sendt til os af brugeren
    const updateData = {};
    for (const [key, value] of Object.entries(otherFields)) {
      if (value !== undefined) {
        updateData[key] = value;
      }
    }

    // Hvis kodeordet er blevet opdateret, så skal det hashes igen
    if (user_password) {
      updateData.user_password = await bcrypt.hash(user_password, 10);
    }

    // Send den opdaterede data (og kun den data, som er blevet opdateret)
    await userRepository.update(updateData, {
      where: { user_id },
    });

    res.status(200).json({message: 'Detaljerne blev opdateret.'});
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Der opstod en ukendt fejl." });
  }
};
