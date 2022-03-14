const establishDBConnection = require('./db/connect');
const express = require('express');
const tasks = require('./routes/tasks');
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
app.use(notFound);

const init = async () => {
    try {
        await establishDBConnection(process.env.MONGO_URI)
        app.listen(process.env.PORT, () => console.log(`Server started at http://localhost:${process.env.PORT}`))
    } catch (error) {
        console.log(error)
    }
}

init();