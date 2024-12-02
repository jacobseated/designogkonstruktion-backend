const db = require("../model");
const userImageRepository = db.userImage;

exports.findOne = async (req, res) => {
  const imageType = (await import('image-type')).default;
  try {
    const image = await userImageRepository.findOne({
      where: { image_user_id: req.params.user_id },
    });

    if (!image || !image.user_image_data) {
      return res.status(404).json({ error: 'Billedet blev ikke fundet' });
    }

    // Find lige ud af, hvad for en type billede vi har med at gøre
    const type = imageType(image.user_image_data);

    if (!type) {
      return res.status(400).json({ error: 'Ugyldigt billedeformat. Prøv at upload billedet igen.' });
    }

    res.set('Content-Type', type.mime);
    res.send(image.user_image_data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Der opstod en serverfejl. Kunne ikke hente billedet!" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { user_id } = req.params;

    const deletedCount = await userImageRepository.destroy({
      where: { user_id: user_id },
    });

    if (deletedCount === 0) {
      return res.status(400).json({ message: "Billedet blev ikke slettet" });
    }

    res.json({ message: "Billedet blev slettet med stor succes" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kunne ikke slette billedet" });
  }
};

exports.create = async (req, res) => {
  try {
    const { user_id, user_image_data } =
      req.body;

    await userImageRepository.create({
      user_id,
      user_image_data
    });

    res.status(201).json({message:'Billedet blev gemt!'});
  } catch (err) {
    console.error("Error creating image:", err);
    res.status(500).json({ message: "Kunne ikke gemme billedet" });
  }
};

exports.update = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { ...otherFields } = req.body;

    const image = await userRepository.findByPk(user_image_id);

    if (!image) {
      return res.status(404).json({ message: "Billedet blev ikke fundet" });
    }

    const updateData = {};
    for (const [key, value] of Object.entries(otherFields)) {
      if (value !== undefined) {
        updateData[key] = value;
      }
    }

    await userRepository.update(updateData, {
      where: { user_id },
    });

    res.status(200).json({message: 'Billedet blev opdateret.'});
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Der opstod en ukendt fejl." });
  }
};
