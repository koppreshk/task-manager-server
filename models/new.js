const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const commonProperties = require('./common');

const properties = {
    status: {
        type: String,
        default: 'new'
    },
    ...commonProperties
}

const NewSchema = new Schema(properties, { collection: 'new', timestamps: true });

module.exports = model('New', NewSchema);
