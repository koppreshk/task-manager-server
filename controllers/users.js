const Users = require('../models/users');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.find({});
        res.status(201).json(allUsers)

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    getAllUsers
}