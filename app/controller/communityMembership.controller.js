const db = require("../model");
const communityMembershipRepository = db.communityMembership;
const community = require("./../model/community");

// Funktion til at hente en liste af alle community medlemskaber (GET)
exports.findAll = async (req, res) => {
  try {
    const { user_id } = req.params;
    const membershipList = await communityMembershipRepository.findAll({
      where: { user_id },
      include: {
        model: community,
        attributes: ["community_name"], // Inkluder også navnet fra community tabellen
      },
      attributes: ["membership_id", "community_id"], // Felter fra community_membership
    });
    res.json(membershipList);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Kunne ikke hente en liste af fællesskaber" });
  }
};

// Funktion til at slette community medlemskaber via user_id og community_id (DELETE)
// Bemærk: DELETE understøtter ikke en body officielt, så vi bruger URL req.params i stedet
exports.delete = async (req, res) => {
  console.log('Params: ' + req.params);
  try {
    const { user_id, community_id} = req.params;

    const deletedCount = await communityMembershipRepository.destroy({
      where: {
        user_id: user_id,
        community_id: community_id
      },
    });
    if (deletedCount === 0) {
      // Hvis community ikke blev fundet, bliver der ikke slettet noget
      return res.status(404).json({ message: "Medlemskabet blev ikke fundet" });
    }

    res.json({ message: "Medlemskabet blev slettet med succes" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kunne ikke slette medlemskabet" });
  }
};

exports.create = async (req, res) => {
  try {
    const { user_id, community_id } = req.body;

    await communityMembershipRepository.create({
      user_id,
      community_id,
    });

    res.status(201).json({ message: "Medlemskabet blev oprettet!" });
  } catch (err) {
    console.error("Error creating community:", err);
    res.status(500).json({ message: "Kunne ikke oprette medlemskab" });
  }
};
