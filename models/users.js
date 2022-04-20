const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const properties = {
    name: String,
    email: String,
    picture: String
}

const Users = new Schema(properties, { collection: 'users', timestamps: true });

module.exports = model('Users', Users);
