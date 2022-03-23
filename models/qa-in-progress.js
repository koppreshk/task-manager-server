const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const commonProperties = require('./common');

const properties = {
    status: {
        type: String,
        default: 'qaInProgress'
    },
    ...commonProperties
}

const QAInProgress = new Schema(properties, { collection: 'qa_in_progress', timestamps: true });

module.exports = model('QAInProgress', QAInProgress);
