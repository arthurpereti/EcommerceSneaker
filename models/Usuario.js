const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('usuario', {
    nome: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING(100)
    },
    telefone: {
        type: DataTypes.STRING(11)
    },
    senha: {
        type: DataTypes.STRING(100)
    },
    tipo: {
        type: DataTypes.STRING(100)
    }
},{
    updatedAt: false,
    createdAt: false
})

// Usuario.sync({force:true})

module.exports = Usuario