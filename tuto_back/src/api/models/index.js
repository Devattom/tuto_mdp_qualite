const { sequelize, DataTypes } = require('../db/sequelize')
const ContactModel = require('../models/contacts')

const Contact = ContactModel(sequelize, DataTypes)

module.exports = {
    Contact
}