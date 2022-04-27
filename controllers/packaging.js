const Packaging = require('../models/packaging');
const QAInProgress = require('../models/qa-in-progress');

const getAllPackagingIssues = async (req, res) => {
    try {
        const allPackagingIssues = await Packaging.find({});
        res.status(201).json({ allPackagingIssues });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getPackagingIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const packagingIssue = await Packaging.findOne({ _id: id });
        if (!packagingIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ data: packagingIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const updatePackagingIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPackagingIssue = await Packaging.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedPackagingIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ updatedPackagingIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deletePackagingIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPackagingIssue = await Packaging.findOneAndDelete({ _id: id });
        if (!deletedPackagingIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ deletedPackagingIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const movePackagingToQAInProgress = async (req, res) => {
    try {
        const documentInCollectionPackaging = await Packaging.findById(req.body.id).select('-updatedAt');
        documentInCollectionPackaging.status = 'qaInProgress'; //Changing the status to qaInProgress 

        const insertedDocumentInCollectionQAInProgress = await QAInProgress.insertMany([documentInCollectionPackaging])
        await Packaging.deleteOne({ _id: documentInCollectionPackaging._id })

        res.status(201).json({ data: insertedDocumentInCollectionQAInProgress });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAllPackagingIssues,
    getPackagingIssue,
    updatePackagingIssue,
    deletePackagingIssue,
    movePackagingToQAInProgress
}