const QAInProgress = require('../models/qa-in-progress');
const ReadyForRelease = require('../models/ready-for-release');

const getAllQAInProgressIssues = async (req, res) => {
    try {
        const allQAInProgressIssues = await QAInProgress.find({});
        res.status(201).json({ allQAInProgressIssues });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getQAInProgressIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const qaInProgressIssue = await QAInProgress.findOne({ _id: id });
        if (!qaInProgressIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ qaInProgressIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const updateQAInProgressIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedQAInProgressIssue = await QAInProgress.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedQAInProgressIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ updatedQAInProgressIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteQAInProgressIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQAInProgressIssue = await QAInProgress.findOneAndDelete({ _id: id });
        if (!deletedQAInProgressIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ deletedQAInProgressIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const moveQAInProgressToReadyForRelease = async (req, res) => {
    try {
        const documentInCollectionQAInProgress = await QAInProgress.findById(req.body.id).select('-updatedAt');
        documentInCollectionQAInProgress.status = 'readyForRelease'; //Changing the status to readyForRelease 

        const insertedDocumentInCollectionReadyForRelease = await ReadyForRelease.insertMany([documentInCollectionQAInProgress])
        await QAInProgress.deleteOne({ _id: documentInCollectionQAInProgress._id })

        res.status(201).json({ insertedDocumentInCollectionReadyForRelease });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAllQAInProgressIssues,
    getQAInProgressIssue,
    updateQAInProgressIssue,
    deleteQAInProgressIssue,
    moveQAInProgressToReadyForRelease
}