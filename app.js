const express= require('express');
const path=require('path');
const sequelize=require('Sequelize')
const adminLog=require('./models/admin/admin')
const adminCandidates=require('./models/admin/candidates')
const Voters=require('./models/voters/voter')
const Result = require('./models/results/result');
const bodyParser=require('body-parser')
const adminRoute=require('./routes/admin/adminRoute');
const voterRoute=require('./routes/voters/voterRoute')
const resultRoute=require('./routes/general/resultRoute');
const app=express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({encoded:true}));
app.set('view engine', 'ejs');
app.use((req,res,next)=>{
    Voters.findByPk(1).then(voter=>{
        req.voter=voter;
        next()
    })
})
Result.hasMany(Voters)
sequelize.sync().then(vote=>{
    app.listen(3005)
})
.catch(err=>{
    console.log(err)
})
app.use(adminRoute);
