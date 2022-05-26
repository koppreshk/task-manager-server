const CodeReview = require('../models/code-review');
const Packaging = require('../models/packaging');

const getAllCodeReviewIssues = async (req, res) => {
    try {
        const allCodeReviewIssues = await CodeReview.find({});
        res.status(201).json({ data: allCodeReviewIssues });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getCodeReviewIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const codeReviewIssue = await CodeReview.findOne({ _id: id });
        if (!codeReviewIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ data: codeReviewIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const updateCodeReviewIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCodeReviewIssue = await CodeReview.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedCodeReviewIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ updatedCodeReviewIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteCodeReviewIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCodeReviewIssue = await CodeReview.findOneAndDelete({ _id: id });
        if (!deletedCodeReviewIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ deletedCodeReviewIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const moveCodeReviewToPackaging = async (req, res) => {
    try {
        const documentInCollectionCodeReview = await CodeReview.findById(req.body.id).select('-updatedAt');
        documentInCollectionCodeReview.status = 'packaging'; //Changing the status to developmentInProgress 

        const insertedDocumentInCollectionPackaging = await Packaging.insertMany([documentInCollectionCodeReview])
        await CodeReview.deleteOne({ _id: documentInCollectionCodeReview._id })

        res.status(201).json({ data: insertedDocumentInCollectionPackaging });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAllCodeReviewIssues,
    getCodeReviewIssue,
    updateCodeReviewIssue,
    deleteCodeReviewIssue,
    moveCodeReviewToPackaging
}