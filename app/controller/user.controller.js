const db = require('../model');
const User = db.User;

exports.findAll = async (req, res) => {
        try {
            const users = await db.User.findAll();
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
};

exports.create = async (req, res) => {
    try {
        // Husk: En HTTP anmodning er en slags datastrøm, hvor henholdsvis "head" og "body" er adskilt med "CRLF"
        //       karaktere. Head indeholder HTTP headers, og body indeholder dataen.

        // Da vi har at gøre med en POST anmodning, så vil de forskellige parametre
        // være gemt i "body" delen af HTTP anmodningen. Sequelize kan automatisk pille dem ud for os ved brug af nedestående:
        const { user_name, user_email, user_password, user_img, user_admin } = req.body; // Bemærk. Variabelnavne auto-matches med properties i HTTP body'en (JavaScript Object Destructuring syntax)
        // Her forsøger vi at indsætte dataen i databasen ved brug af sequelize
        const newUser = await db.User.create({
            user_name,
            user_email,
            user_password,
            user_img,
            user_admin
        });

        // Send svaret tilbage til klienten (Eks. cURL, POSTMAN eller vores Frontend)
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Failed to create user' });
    }
};