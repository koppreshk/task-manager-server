const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const commonProperties = require('./common');

const properties = {
    status: {
        type: String,
        default: 'packaging'
    },
    ...commonProperties
}

const Packaging = new Schema(properties, { collection: 'packaging', timestamps: true });

module.exports = model('Packaging', Packaging);
