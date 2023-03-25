const Voter = require('../../models/voters/voter')
const session= require('express-session')
const bcrypt=require('bcrypt')
const {valiadtionResult}=require('express-validator/check')
const nodemailer=require('nodemailer')

exports.registerVoterPage=(req,res)=>{
    res.render('/voters/registration', {title:"We-Vote::Register"})
}

exports.registerVoter=(req,res)=>{
const {Email, Nin, Name, Phone, Password}=req.body

}