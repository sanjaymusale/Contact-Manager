const mongoose = require('mongoose')
const validator = require('validator')

const { Schema } = mongoose
const contactSchema = new Schema({
    // all the fields, its types, and its validations
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 128
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
        // custom validations
        validate: {
            validator: function (value) {
                return validator.isNumeric(value)
            },
            message: function () {
                return 'invalid mobile number format'
            }
        }
    },
    email: {
        type: String,
        validate: {
            validator: function (value) {
                if (validator.isEmpty(value)) {
                    return true
                }
                return validator.isEmail(value)
            },
            message: function () {
                return 'invalid email format'
            }
        }
    },
    website: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = {
    Contact
}
