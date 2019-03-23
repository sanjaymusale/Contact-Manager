const mongoose = require('mongoose')
// DB CONFIGURATION
// telling mongoose to use es6's promise library   
mongoose.Promise = global.Promise
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb+srv://sanjay_1992:Sanjaynm$1992@cluster0-z3l82.mongodb.net/contact-manager?retryWrites=true'
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('Error connecting to DB', err)
    })

module.exports = {
    mongoose
}