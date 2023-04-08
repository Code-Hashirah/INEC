const Candidates= require('../../models/admin/candidates')
const session= require('express-session')
const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator/check')
const nodemailer=require('nodemailer')
// const crypto=require('crypto')
const fs = require('fs');
const path= require('path')

exports.addCandidatesPage=(req,res)=>{
    let errors=req.flash('errors');
    res.render('admin/add-candidates', {title:"Add Candidates", ErrorMsg:errors})
}

exports.addCandidates=(req,res)=>{
    const {Name, Age, Dob, Party, PartyLogo, Contesting}=req.body
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        req.flash('errors', errors.array())
        return req.session.save(()=>{
            res.redirect('/add-candidates')
        })
    }
    let imagePath='/images/'+req.files.Image[0].filename;
    let picPath='/images/'+req.files.Picture[0].filename;
    Candidates.create({
        name:Name,
        age:Age,
        dob:Dob,
        party:Party,
        pic:imagePath,
        contesting:Contesting,
        picture:picPath
    }).then(contestant=>{
        req.session.save(()=>{
            res.redirect('/add-candidates')
        })
    }).catch(err=>{
        console.log(err);
    })
}


exports.manageCandidatesPage=(req,res)=>{
    Candidates.findAll().then(candidates=>{
        res.render('admin/manage-candidates', {title:"Manage Candidates", Candidate:candidates})
    })
}

exports.deleteCandidate=(req,res)=>{
    const {Id}=req.body
    Candidates.findByPk(Id).then(Candidate=>{
       if(!Candidate){
        throw new Error('Candidate not found');
       }
        // console.log(Candidate)
        const imagePath=path.join(__dirname, '../../public',Candidate.pic);
        return fs.promises.unlink(imagePath).then(()=>{
            const picPath=path.join(__dirname,'../../public', Candidate.image);
            return fs.promises.unlink(picPath).then(()=>Candidate.destroy());
        })
    }).then(()=>{
     res.redirect('/manage-candidates')
    }).catch(err=>{
        console.log(err);
        res.status(500).send('An error occured while deleting the file or candidate')
    })
}