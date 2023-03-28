const Candidates= require('../../models/admin/candidates')
const session= require('express-session')
const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator/check')
const nodemailer=require('nodemailer')
// const crypto=require('crypto')

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
    let imagePath='/images/'+req.file.filename
    Candidates.create({
        name:Name,
        age:Age,
        dob:Dob,
        party:Party,
        pic:imagePath,
        contesting:Contesting,
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
        console.log(Candidate)
       return Candidate.destroy();
    }).then(Candidate=>{
     res.redirect('/manage-candidates')
    }).catch(err=>{
        console.log(err)
    })
}