const sequelize =require('../../database/connect');
const Sequelize =require('sequelize');
const Admin=sequelize.define('adminLog',{
    
    names:{
        type:Sequelize.STRING(40),
        allowNull:false,
    },
    phone:{
        type:Sequelize.INTEGER(11),
        allowNull:false
    },
    pic:{
        type:Sequelize.STRING,
        allowNull:false,
      },
    email:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})
module.exports=Admin;