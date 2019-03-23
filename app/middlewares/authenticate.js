const { User } = require('../models/user')


function authenticateUser(req, res, next) {
    const token = req.header('x-auth')
    if (token) {
        //console.log('inside authenticate =>', token)
        User.findByToken(token)
            .then((user) => {

                //console.log('inside return', user)
                req.user = user
                req.token = token
                next()
            })
            .catch((err) => {
                res.send({ notice: 'error at authenticate' })
            })
    } else {
        res.send('token not provided')
    }
}

module.exports = {
    authenticateUser
}

