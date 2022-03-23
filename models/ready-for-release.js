const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const commonProperties = require('./common');

const properties = {
    status: {
        type: String,
        default: 'readyForRelease'
    },
    ...commonProperties
}

const ReadyForRelease = new Schema(properties, { collection: 'ready_for_release', timestamps: true });

module.exports = model('ReadyForRelease', ReadyForRelease);
