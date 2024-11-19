const db = require('../model');

module.exports = app => {
    app.get('/users', async (req, res) => {
        try {
            const users = await db.User.findAll(); // Await inside the route handler
            res.json(users); // Send the users as a JSON response
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    });

    app.post('/users', (req, res) => {
        res.send('User created.');
    });
};
