const mongoose = require('mongoose')
// DB CONFIGURATION
// telling mongoose to use es6's promise library
mongoose.Promise = global.Promise
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/contact-manager-nov'
console.log(CONNECTION_URI)
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
