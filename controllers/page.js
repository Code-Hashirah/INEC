const Candidates=require('../models/admin/candidates')
const Voter=require('../models/voters/voter')

exports.homePage=(req,res)=>{
    res.render('index', {title:"We-Vote::Home"})
}

exports.adminDashboardPage=(req,res)=>{
    res.render('admin/dashboard', {title:"Admin::Dashboard"})
}