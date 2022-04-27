const NewModel = require('../models/new');
const DevelopmentInProgress = require('../models/development-in-progess');

const getAllNewIssues = async (req, res) => {
    try {
        const newIssues = await NewModel.find({});
        res.status(201).json({ newIssues });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const createNewIssue = async (req, res) => {
    try {
        const newIssue = await NewModel.create(req.body);
        res.status(201).json({ newIssue });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getNewIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const newIssue = await NewModel.findOne({ _id: id });
        if (!newIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ data: newIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const updateNewIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedIssue = await NewModel.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ updatedIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteNewIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIssue = await NewModel.findOneAndDelete({ _id: id });
        if (!deletedIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ deletedIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const moveNewToDev = async (req, res) => {
    try {
        const documentInCollectionNew = await NewModel.findById(req.body.id).select('-createdAt -updatedAt');
        documentInCollectionNew.status = 'developmentInProgress'; //Changing the status to developmentInProgress 

        const insertedDocumentInCollectionDev = await DevelopmentInProgress.insertMany([documentInCollectionNew])
        await NewModel.deleteOne({ _id: documentInCollectionNew._id })

        res.status(201).json({ data: insertedDocumentInCollectionDev });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAllNewIssues,
    createNewIssue,
    getNewIssue,
    updateNewIssue,
    deleteNewIssue,
    moveNewToDev
}