const sequelize= require('../../database/connect');
const {DataTypes}= require('sequelize');
const session = require('express-session');
const candidates=sequelize.define("candidates", {
id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
},
name:{
type:DataTypes.STRING(50),
allowNull:false
},
age:{
    type:DataTypes.INTEGER,
    allowNull:false
},
dob:{
    type:DataTypes.DATE,
    allowNull:false
},
party:DataTypes.TEXT,
pic:DataTypes.STRING,
role:{
    type:DataTypes.STRING(60),
    unique:true,

}
})


module.exports=candidates;