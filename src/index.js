const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express()

app.use(cors())

require('./db/mongoose')

const usersRouter = require('./routers/users');
const tasksRouter = require('./routers/tasks') 

dotenv.config()

app.use(express.json())
app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)

app.listen(process.env.PORT, () => console.log(`Connected and running on ${process.env.PORT}`))
