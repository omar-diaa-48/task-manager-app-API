const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const databaseName = 'task-manager'
const connectionURL = `mongodb+srv://iti-user:${process.env.password}@cluster0.tg0ks.mongodb.net/${databaseName}?retryWrites=true&w=majority`


mongoose.connect(connectionURL, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})

