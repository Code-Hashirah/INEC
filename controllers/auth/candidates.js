const Candidates= require('../../models/admin/candidates')
const session= require('express-session')
const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator/check')
const nodemailer=require('nodemailer')
// const crypto=require('crypto')

exports.addCandidatesPage=(req,res)=>{
    res.render('admin/add-candidates', {title:"Add Candidates"})
}

exports.addCandidates=(req,res)=>{
    
}