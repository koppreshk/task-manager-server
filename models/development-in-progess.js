const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const commonProperties = require('./common');

const properties = {
    status: {
        type: String,
        required: [true, 'status field is required']
    },
    ...commonProperties
}

const DevelopmentInProgress = new Schema(properties, { collection: 'development_in_progress', timestamps: true });

module.exports = model('DevelopmentInProgress', DevelopmentInProgress);
