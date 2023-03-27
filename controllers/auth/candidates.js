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
    const {Name, Age, Dob, Party, PartyLogo, Contesting}=req.body
    Candidates.create({
        name:Name,
        age:Age,
        dob:Dob,
        party:Party,
        pic:PartyLogo,
        contesting:Contesting,
    }).then(contestant=>{
        req.session.save(()=>{
            res.redirect('/add-candidates')
        })
    }).catch(err=>{
        console.log(err);
    })
}