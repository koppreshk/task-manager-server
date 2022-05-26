const DevelopmentInProgress = require('../models/development-in-progess');
const CodeReview = require('../models/code-review');

const getAllDevIssues = async (req, res) => {
    try {
        const allDevIssues = await DevelopmentInProgress.find({});
        res.status(201).json({ data: allDevIssues });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getDevIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const devIssue = await DevelopmentInProgress.findOne({ _id: id });
        if (!devIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ data: devIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const updateDevIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDevIssue = await DevelopmentInProgress.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedDevIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ updatedDevIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteDevIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDevIssue = await DevelopmentInProgress.findOneAndDelete({ _id: id });
        if (!deletedDevIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ deletedDevIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const moveDevToCodeReview = async (req, res) => {
    try {
        const documentInCollectionDev = await DevelopmentInProgress.findById(req.body.id).select('-createdAt -updatedAt');
        documentInCollectionDev.status = 'codeReview'; //Changing the status to developmentInProgress 

        const insertedDocumentInCollectionCodeReview = await CodeReview.insertMany([documentInCollectionDev])
        await DevelopmentInProgress.deleteOne({ _id: documentInCollectionDev._id })

        res.status(201).json({ data: insertedDocumentInCollectionCodeReview });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAllDevIssues,
    getDevIssue,
    updateDevIssue,
    deleteDevIssue,
    moveDevToCodeReview
}