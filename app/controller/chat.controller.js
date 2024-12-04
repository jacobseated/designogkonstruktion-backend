const db = require("../model");
const chatRepository = db.chat;
const user = require("../model/user");

// Metode til at hente chatbeskederne i et community (GET)
exports.findAll = async (req, res) => {
  try {
    const { community_id } = req.params;
    const chatMessages = await chatRepository.findAll({
      where: { community_id },
      include: {
        model: user,
        attributes: ["user_fullname"], // Inkluder også navnet fra user tabellen
      },
    });
    res.json(chatMessages);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Kunne ikke hente chatbeskederne" });
  }
};

exports.create = async (req, res) => {
  try {
    const { community_id } = req.params;
    const { user_id, chat_message } = req.body;

    await chatRepository.create({
      user_id,
      community_id,
      chat_message,
    });

    res.status(201).json({ message: "Chatbeskeden blev sendt!" });
  } catch (err) {
    console.error("Error creating chat message:", err);
    res.status(500).json({ message: "Kunne ikke afsende chatbeskeden" });
  }
};
