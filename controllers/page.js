// const { useReducer } = require('react/cjs/react.production.min')
const { Sequelize, Op } = require('sequelize')
const Candidates=require('../models/admin/candidates')
const Voter=require('../models/voters/voter')
// const {Op}=require('sequelize');
exports.homePage=(req,res)=>{
    res.render('index', {title:"We-Vote::Home"})
}

exports.adminDashboardPage=(req,res)=>{
    res.render('admin/dashboard', {title:"Admin::Dashboard"})
}
// presidency  ballot controllers
exports.votePresidentBallot=(req,res)=>{
    Candidates.findAll({
        where:{
            contesting:{
                [Op.like]:'%Presidency%'
            }
            }
    }).then(person=>{
        res.render('ballot/president',{title:"Presidency Ballot", Cand:person})
        console.log(person)
    })
    .catch(err=>{
        console.log (err)
    })
   
}

exports.votePresident=(req,res)=>{
    const {Id}=req.body
    Candidates.findByPk(Id).then(chosen=>{
        chosen.increment('votes')
    }).then(voted=>{
        res.redirect('/vote-govenor')
    }).catch(err=>{
        console.log(err)
    })
}

// voteGovenorBallot
// Govenor  ballot controllers
exports.voteGovenorBallot=(req,res)=>{
    Candidates.findAll({
        where:{
            contesting:{
                [Op.like]:'%Governorship%'
            }
            }
    }).then(Gov=>{
        res.render('ballot/govenor',{title:"Govenorship Ballot", Govenor:Gov})
        console.log(Gov)
    })
    .catch(err=>{
        console.log (err)
    })
   
}

exports.voteGovenor=(req,res)=>{
    const {Id}=req.body
    Candidates.findByPk(Id).then(chosen=>{
        chosen.increment('votes')
    }).then(voted=>{
let ID =req.session.user.id
Voter.findByPk(ID).then(voter=>{
    voter.voted="YES"
})
        res.redirect('/vote-govenor')
    }).catch(err=>{
        console.log(err)
    })
}
