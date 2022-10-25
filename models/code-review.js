const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const commonProperties = require('./common');

const properties = {
    status: {
        type: String,
        default: 'codeReview'
    },
    ...commonProperties
}

const CodeReview = new Schema(properties, { collection: 'code_review', timestamps: true });

module.exports = model('CodeReview', CodeReview);
