const establishDBConnection = require('./db/connect');
const express = require('express');
const tasks = require('./routes/tasks');
const newIssues = require('./routes/new-issues');
const devIssues = require('./routes/development-in-progress');
const codeReviewIssues = require('./routes/code-review');
const packaging = require('./routes/packaging'); 
const qaInProgress = require('./routes/qa-in-progress'); 
const readyForRelease = require('./routes/ready-for-release'); 

// Set up Global configuration access
require('dotenv').config();
const notFound = require('./middleware/route-not-found');
const cors = require("cors");

//Initialize express
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//Middleware
app.use(express.json());
app.use(cors()) // Use this after the variable declaration

app.use('/api/v1/tasks', tasks);
app.use('/api/v1/newIssues', newIssues);
app.use('/api/v1/devIssues', devIssues);
app.use('/api/v1/codeReviewIssues', codeReviewIssues);
app.use('/api/v1/packagingIssues', packaging);
app.use('/api/v1/qaInProgressIssues', qaInProgress);
app.use('/api/v1/readyForReleaseIssues', readyForRelease);

app.use(notFound);

const init = async () => {
    try {
        await establishDBConnection(process.env.MONGO_URI)
        app.listen(process.env.PORT || 9000, () => console.log(`Server started at http://localhost:${process.env.PORT}`))
    } catch (error) {
        console.log(error)
    }
}

init();