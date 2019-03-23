const express = require('express')
const router = express.Router()
const { Contact } = require('../models/contact')
const { validateID } = require('../middlewares/validate')
const { authenticateUser } = require('../middlewares/authenticate')


// route - fetch all contacts from db and send it to client 
router.get('/', authenticateUser, (req, res) => {
    //console.log('asdasdas', req.user._id)
    Contact.find({ user: req.user._id })
        .then((contacts) => {
            //console.log('inside get contact', contacts)
            res.send(contacts)

        })
        .catch((err) => {
            res.send(err)
        })
})

// route - to create a contact 
router.post('/', authenticateUser, (req, res) => {
    const body = req.body
    const contact = new Contact(body)
    contact.user = req.user._id
    contact.save()
        .then((contact) => {
            res.send(contact)
        })
        .catch((err) => {
            res.send(err)
        })
})

// route - to get a contact 
router.get('/:id', validateID, authenticateUser, (req, res) => {
    const id = req.params.id
    Contact.findById(id)
        .then((contact) => {
            if (contact) { // if the contact is present
                res.send(contact)
            } else { // if contact not present then value is null
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

// route - to delete a contact
router.delete('/:id', validateID, authenticateUser, (req, res) => {
    const id = req.params.id
    Contact.findByIdAndDelete(id)
        .then((contact) => {
            if (contact) {
                res.send(contact)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id', validateID, authenticateUser, (req, res) => {
    const id = req.params.id
    const data = req.body
    Contact.findOneAndUpdate({ _id: id }, { $set: data })
        .then((contact) => {
            if (contact) {
                res.send(contact)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    contactsRouter: router
}