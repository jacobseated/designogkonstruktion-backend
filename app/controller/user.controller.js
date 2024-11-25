const db = require("../model");
const bcrypt = require("bcrypt"); // Brugt til password hashing
const User = db.User;

exports.findAll = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ["user_password"] }, // Ekskluder de her kolonner
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kunne ikke hente en liste af brugere" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { user_name: req.body.user_name }, // Udtag user_name fra body delen af HTTP anmodningen
      attributes: { exclude: ["user_password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Brugeren blev ikke fundet" });
    }

    res.json(user); // Send brugeren tilbage til vores frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kunne ikke hente en liste af brugere" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Brug Sequelize's destroy method til at slette brugeren. -> DELETE FROM users WHERE user_id = user_id;
    const deletedCount = await db.User.destroy({
      where: { user_id: user_id },
    });
    console.log('Username: ' + user_id);
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

exports.create = async (req, res) => {
  try {
    // Husk: En HTTP anmodning er en slags datastrøm, hvor henholdsvis "head" og "body" er adskilt med "CRLF" (\r\n),
    //       karaktere. Head indeholder primært HTTP headers, imens body indeholder dataen.

    // Da vi har at gøre med en POST anmodning, så vil de forskellige parametre
    // være gemt i "body" delen af HTTP anmodningen. Sequelize kan automatisk pille dem ud for os ved brug af nedestående:
    const { user_name, user_mail, user_password, user_img, user_admin } =
      req.body; // Bemærk. Variabelnavne auto-matches med properties i HTTP body'en (JavaScript Object Destructuring syntax)

    const hashed_password = await bcrypt.hash(user_password, 10);

    // Her forsøger vi at indsætte dataen i databasen ved brug af sequelize
    const newUser = await db.User.create({
      user_name,
      user_mail,
      user_password: hashed_password,
      user_img,
      user_admin,
    });

    // Send svaret tilbage til klienten (Eks. cURL, POSTMAN eller vores Frontend)
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Kunne ikke oprette brugeren" });
  }
};

exports.update = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_password, ...otherFields } = req.body;

    // Find brugeren via ID
    const user = await db.User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" }); // Return 404 if the user does not exist
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
    const updatedUser = await user.update(updateData);

    res.status(200).json(updatedUser); // Returner den opdaterede data. Det kan måske bruges af klienten
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Der opstod en ukendt fejl." });
  }
};
