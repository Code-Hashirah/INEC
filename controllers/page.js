const Candidates=require('../models/admin/candidates')
const Voter=require('../models/voters/voter')

exports.homePage=(req,res)=>{
    res.render('index', {title:"We-Vote::Home"})
}