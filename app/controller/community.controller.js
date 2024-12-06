const db = require("../model");
const communitRepository = db.community;

// Funktion til at hente en liste af alle communities (GET)
exports.findAll = async (req, res) => {
  try {
    const communityList = await communitRepository.findAll();
    res.json(communityList);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Kunne ikke hente en liste af fællesskaber" });
  }
};

// Funktion til at hente detaljerne om en enkelt community via community_id (GET)
exports.findOne = async (req, res) => {
  try {
    const { community_id } = req.params;

    const community = await communitRepository.findOne({
      where: { community_id: community_id }, // Udtag user_id fra body delen af HTTP anmodningen
    });

    // Tjek om community blev fundet
    if (!community) {
      return res.status(404).json({ message: "Fællesskabet blev ikke fundet" });
    }

    res.json(community); // Send community tilbage til vores frontend
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Kunne ikke hente en liste af Fællesskaber" });
  }
};

// Funktion til at slette fællesskaber via community_id (DELETE)
exports.delete = async (req, res) => {
  try {
    const { community_id } = req.params;

    // Brug Sequelize's destroy method til at slette fællesskabet. -> DELETE FROM community WHERE community_id = community_id;
    const deletedCount = await communitRepository.destroy({
      where: { community_id: community_id },
    });
    if (deletedCount === 0) {
      // Hvis community ikke blev fundet, bliver der ikke slettet noget
      return res.status(404).json({ message: "Fællesskabet blev ikke fundet" });
    }

    res.json({ message: "Fællesskabet blev slettet med succes" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kunne ikke slette fællesskabet" });
  }
};

 // Bemærk: vis skal også oprette et tilhørende forum, men det kan vi måske gøre via en trigger
exports.create = async (req, res) => {
  try {
    const { community_name } = req.body;

    await communitRepository.create({
      community_name,
    });

    res.status(201).json({ message: "Fællesskab blev oprettet!" });
  } catch (err) {
    console.error("Error creating community:", err);
    res.status(500).json({ message: "Kunne ikke oprette fællesskab" });
  }
};
