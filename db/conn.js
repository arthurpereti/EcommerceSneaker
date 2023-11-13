const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'senai', {
  host: 'localhost',
  dialect: 'mysql'
});

// sequelize.authenticate().then(()=>{
//     console.log('Connection has been established successfully.');
// }).catch((error)=>{
//     console.error('Connection has been not established successfully.'+error);
// })


module.exports = sequelize