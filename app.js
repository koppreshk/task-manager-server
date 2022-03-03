const establishDBConnection = require('./db/connect');
const express = require('express');
const tasks = require('./routes/tasks');
require('dotenv').config();

//Initialize express
const app = express();
const PORT = 9000;

//Middleware
app.use(express.json());

app.use('/api/v1/tasks', tasks);

const init = async() => {
    try {
        await establishDBConnection(process.env.MONGO_URI)
        app.listen(PORT, () => console.log('Server started at http://localhost:9000'))
    } catch (error) {
        console.log(error)
    }
}

init();