const validator = require('validator')

function validateID(req, res, next) {
    console.log(req.params)
    if (validator.isMongoId(req.params.id)) {
        next()
    }
    else {
        res.send({
            notice: "Invalid object Id"
        })
    }
}

module.exports = {
    validateID
}