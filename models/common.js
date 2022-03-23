const commonProperties = {
    title: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    description: String,
    changeSetDetails: String,
    codeReviewComments: String,
    qaComments: String,
    assignee: String,
    reporter: String,
    priority: {
        type: String,
        default: 'low'
    }
}

module.exports = commonProperties;