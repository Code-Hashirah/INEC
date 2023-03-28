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
        type:DataTypes.STRING(30),
        unique:true,
        allowNull:false
    },
    nin:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    phone:{
        type:DataTypes.INTEGER(11),
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    activated:{
        type:DataTypes.STRING(3),
        allowNull:true
    },
    token:DataTypes.STRING
});

module.exports=voter;