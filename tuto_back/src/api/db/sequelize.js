const { Sequelize, DataTypes } = require('sequelize')
const ContactModel = require('../models/contacts')

const sequelize = new Sequelize(
    'tuto_contact',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb'
    }
)

sequelize.authenticate()
.then(_ => console.log('Connexion établie'))
.catch(error => console.error(`Impossible de se connecter : ${error}`)) 

const Contact = ContactModel(sequelize, DataTypes)

module.exports = {
    Contact
}