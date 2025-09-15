const express = require('express');
const { Contact } = require('../db/sequelize');
const router = express.Router()

router.get('/contacts', (req, res) => {
    Contact.findAll()
    .then(contacts => {
        console.log(contacts)
        res.json({data: contacts})
    })
    .catch(error => {
        const message = 'La liste de contact n\'a pas pu être récupérée'
        res.status(500).json({message, error})
    })
})

module.exports = router