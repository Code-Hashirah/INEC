const sequelize= require('../database/connect');
const {DataTypes}= require('sequelize');
const session = sequelize.define("session", {

    sid:{
        type:DataTypes.STRING,
        primaryKey:true,
    },
    userId:DataTypes.STRING,
    expires:DataTypes.DATE,
    data:DataTypes.TEXT,
})

module.exports=session;