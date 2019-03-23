const express = require('express')
const cors = require('cors')
require('./config/database')

const { contactsRouter } = require('./app/controllers/contacts_controller')
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
var fs = require('fs')
var morgan = require('morgan')

const path = require('path')
app.use(express.static(path.join(__dirname, 'client/build')))

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
const { userRouter } = require('./app/controllers/user_controller')

app.get('/', (req, res) => {
    res.send('Welcome to the Contact Manager')
})

app.use('/contact', contactsRouter)
app.use('/user', userRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(port, () => {
    console.log('Listening to port', port)
})