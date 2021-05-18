const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express()

const port = process.env.PORT
app.set('view engine', 'hbs')
app.use(cors())

require('./db/mongoose')
app.use(express.static(path.join(__dirname,'../public')))
const usersRouter = require('./routers/users');
const tasksRouter = require('./routers/tasks') 


app.use(express.json())
app.get('/', (req,res) => res.send('Hello'))
app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)
app.use('*', (req,res) => {
    res.render('404')
})

app.listen(port, () => console.log(`Connected and running on ${port}`))
