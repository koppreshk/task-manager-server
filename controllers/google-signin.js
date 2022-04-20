const { OAuth2Client } = require('google-auth-library');
const Users = require('../models/users');

const clientInstance = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const manageGoogleSignIn = async (req, res) => {
    try {
        const { tokenId } = req.body;
        const ticket = await clientInstance.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const { name, email, picture } = ticket.getPayload();
        const foundUser = await Users.find({ email: email });
        if (foundUser.length) {
            res.status(201).json(foundUser[0]);
        }
        else {
            const insertedUser = await Users.create({ name, email, picture })
            res.status(201).json(insertedUser)
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    manageGoogleSignIn
}