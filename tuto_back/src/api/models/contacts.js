module.exports = (sequelize, Datatypes) => {
    return sequelize.define('Contact', {
        id: {
            type: Datatypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        lastname: {
            type: Datatypes.STRING(100),
            allowNull: false
        },
        firstname: {
            type: Datatypes.STRING(100),
            allowNull: true
        },
        company: {
            type: Datatypes.STRING(150),
            allowNull: true,
        },
        address: {
            type: Datatypes.TEXT,
            allowNull: true
        },
        phone: {
            type: Datatypes.STRING(20),
            allowNull: true,
            validate: {
                is: /^\+?[1-9]\d{0,3}[\s.-]?\(?\d+\)?([\s.-]?\d+)*$/
            }
        },
        email: {
            type: Datatypes.STRING(100),
            allowNull: true,
            validate: {
                is: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
            }
        }
    }, {
        timestamps: false
    })
}
