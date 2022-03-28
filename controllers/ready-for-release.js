const ReadyForRelease = require('../models/ready-for-release');

const getAllReadyForReleaseIssues = async (req, res) => {
    try {
        const allReadyForReleaseIssues = await ReadyForRelease.find({});
        res.status(201).json({ allReadyForReleaseIssues });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getReadyForReleaseIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const readyForReleaseIssue = await ReadyForRelease.findOne({ _id: id });
        if (!readyForReleaseIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ readyForReleaseIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const updateReadyForReleaseIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReadyForReleaseIssue = await ReadyForRelease.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedReadyForReleaseIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ updatedReadyForReleaseIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteReadyForReleaseIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReadyForReleaseIssue = await ReadyForRelease.findOneAndDelete({ _id: id });
        if (!deletedReadyForReleaseIssue) {
            return res.status(404).json({ msg: `Issue with id: ${id} was not found` })
        }
        res.status(200).json({ deletedReadyForReleaseIssue });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}


module.exports = {
    getAllReadyForReleaseIssues,
    getReadyForReleaseIssue,
    updateReadyForReleaseIssue,
    deleteReadyForReleaseIssue
}