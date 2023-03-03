const Sequelize = require('sequelize');
const connect=new Sequelize('inec', 'root', '',{
    host:'localhost',
    dialect:'mysql'
})

module.exports=connect;