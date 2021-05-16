const express = require('express');
const dotenv = require('dotenv');
const app = express()

require('./db/mongoose')

const usersRouter = require('./routers/users');
const tasksRouter = require('./routers/tasks') 

dotenv.config()

app.use(express.json())
app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)

app.listen(process.env.PORT, () => console.log('Connected'))
