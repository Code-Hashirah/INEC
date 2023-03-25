const sequelize= require('../../database/connect');
const {DataTypes}= require('sequelize');
const voter=sequelize.define("voters", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    nin:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    phone:{
        type:DataTypes.INTEGER(11),
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
    allowNull:false
    },
    activated:{
        type:DataTypes.STRING(3),
        allowNull:true
    }
});

module.exports=voter;