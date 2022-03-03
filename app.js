const establishDBConnection = require('./db/connect');
const express = require('express');
const tasks = require('./routes/tasks');
require('dotenv').config();

//Initialize express
const app = express();
const PORT = 9000;

//Middleware
app.use(express.json());

app.get('/hello', (request, response) => {
    response.send('Task Manager App');
})

app.use('/api/v1/tasks', tasks);

const start = async() => {
    try {
        await establishDBConnection(process.env.MONGO_URI)
        app.listen(PORT, () => console.log('Server started at http://localhost:9000'))
    } catch (error) {
        console.log(error)
    }
}

//API's Used currently:
/*
          URL         | METHOD |   Name
    _________________________________________      

    /api/v1/tasks     | GET    |  GetAllTasks
    /api/v1/tasks     | POST   |  CreateTask
    /api/v1/tasks/:id | GET    |  GetTask
    /api/v1/tasks/:id | PATCH  |  UpdateTask
    /api/v1/tasks/:id | DELETE |  deleteTask
*/
start()