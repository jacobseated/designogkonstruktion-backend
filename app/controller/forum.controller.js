const db = require("../model");
const forumRepository = db.forum;
const user = require("../model/user");

// Metode til at hente forum beskederne i et community (GET)
exports.findAll = async (req, res) => {
  try {
    const { community_id } = req.params;
    const forumMessages = await forumRepository.findAll({
      where: { community_id },
      include: {
        model: user,
        attributes: ["user_fullname"], // Inkluder også navnet fra user tabellen
      },
    });
    res.json(forumMessages);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Kunne ikke hente forum beskederne" });
  }
};

exports.create = async (req, res) => {
  try {
    const { community_id } = req.params;
    const { user_id, forum_message } = req.body;

    await forumRepository.create({
      user_id,
      community_id,
      forum_message,
    });

    res.status(201).json({ message: "Forum beskeden blev sendt!" });
  } catch (err) {
    console.error("Error creating forum message:", err);
    res.status(500).json({ message: "Kunne ikke afsende chatbeskeden" });
  }
};
