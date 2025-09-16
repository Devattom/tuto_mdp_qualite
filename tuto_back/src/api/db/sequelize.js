const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    'tuto_contact',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mariadb'
    }
)

sequelize.authenticate()
.then(_ => console.log('Connexion établie'))
.catch(error => console.error(`Impossible de se connecter : ${error}`)) 

module.exports = {
    sequelize, DataTypes
}