const express = require('express');
const { Contact } = require('../models/index');
const router = express.Router()

router.get('/contacts', (req, res) => {
    Contact.findAll()
    .then(contacts => {
        res.json({data: contacts})
    })
    .catch(error => {
        const message = 'La liste de contact n\'a pas pu être récupérée'
        res.status(404).json({message, error})
    })
})

router.delete('/contacts/:id', (req, res) => {
    const contactId = req.params.id;
    console.log(contactId);
    
    Contact.destroy({
        where: {
            id: contactId
        }
    })
    .then(_ => res.json({message : `Le contact ${contactId} a bien été supprimé`}))
    .catch(error => res.status(404).json({message: `Erreur lors de la supression`, error}))
})

module.exports = router