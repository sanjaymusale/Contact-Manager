const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'invalid Email'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]


})

// pre/post hooks - mongoose Middleware
userSchema.pre('save', function (next) {
    if (this.isNew) {
        bcryptjs.genSalt(10)
            .then((salt) => {
                bcryptjs.hash(this.password, salt).then((hashedPassword) => {
                    this.password = hashedPassword
                    next()
                })
            })
    }
    else {
        next()
    }

})

userSchema.statics.findByEmailandPassword = function (email, password) {
    const User = this
    return User.findOne({ email })
        .then((user) => {
            if (user) {
                return bcryptjs.compare(password, user.password)
                    .then((result) => {
                        if (result) {
                            return new Promise((resolve, reject) => {
                                resolve(user)
                            })
                        }
                        else {
                            return new Promise((resolve, reject) => {
                                const err = 'Invalid Email and Password'
                                reject({ error: err })
                            })
                        }
                    })
            } else {
                return Promise.reject({ error: 'Invalid Email and Password' })
            }

        })
        .catch((err) => {
            return Promise.reject(err)
        })
}
userSchema.statics.findByToken = function (token) {
    const User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'dct@welt123')

    } catch (err) {
        // console.log('inside try catch')
        return Promise.reject(err)
    }
    //console.log('inside findbytoken =>', tokenData)


    // return User.findOne({
    //     '_id': tokenData.userid,
    //     'tokens.token': token
    // })
    //     .then((user) => {
    //         return Promise.resolve(user)
    //     })
    //     .catch((err) => {
    //         return Promise.reject({})
    //     })

    return User.findOne({
        '_id': tokenData.userid
    })
        .then((user) => {
            var found = user.tokens.some(x => x.token === token)
            // console.log('inside find by token =>', found)
            if (found) {
                return User.findOne({
                    '_id': tokenData.userid,
                    'tokens.token': token
                })
                    .then((user) => {
                        // console.log('promose reolve')
                        return Promise.resolve(user)
                    })
                    .catch((err) => {
                        // console.log('promose reject')
                        return Promise.reject(err)
                    })

            }
            else {
                return Promise.reject({ notice: 'redirect to login page' })
            }
        })
        .catch((err) => {
            return Promise.reject(err)
        })


}

userSchema.methods.generateToken = function () {
    const user = this
    const tokenData = {
        userid: user._id,
        name: user.name
    }

    const token = jwt.sign(tokenData, 'dct@welt123')
    user.tokens.push({ token })
    return user.save()
        .then((user) => {
            return token
        })
        .catch((err) => {
            return err
        })


}


const User = mongoose.model('User', userSchema)

module.exports = {
    User
}