const sequelize= require('../../database/connect')
const {DataTypes}= require('sequelize');
const result= sequelize.define("result", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    candidate:DataTypes.STRING(55)
})

module.exports=result;