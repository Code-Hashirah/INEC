const express= require('express');
const path=require('path');
const sequelize=require('./database/connect')
const adminLog=require('./models/admin/admin')
const adminCandidates=require('./models/admin/candidates')
const Voters=require('./models/voters/voter')
const Result = require('./models/results/result');
const Admin = require('./models/admin/admin');
const Candidates = require('./models/admin/candidates')
const Session= require('./models/session')
const bodyParser=require('body-parser')
const adminRoute=require('./routes/admin/adminRoute');
const voterRoute=require('./routes/voters/voterRoute')
const resultRoute=require('./routes/general/resultRoute');
const app=express();
const session=require('express-session')
const SequelizeStore= require('connect-session-sequelize')(session.Store)
const flash = require('connect-flash')
const multer = require('multer')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({encoded:true}));
let storage= multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'public/images')
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now()+ "-" +'picture'+ file.originalname)
    }
})
app.use(multer({storage:storage}).single('image'))
app.set('view engine', 'ejs');
app.use(flash())
app.use(session({
    secret: 'our secret',
    resave:false,
    saveUninitialized:false,
    store:new SequelizeStore({
        db:sequelize,
    }),
    cookie:{}
}))
// app.use((req,res,next)=>{
//     Voters.findByPk(1).then(voter=>{
//         req.voter=voter;
//         next()
//     })
// })
app.use((req, res, next)=>{
    res.locals.isLoggedIn=req.session.isLoggedIn;
    res.locals.user=req.session.user
    next()
})
app.use(adminRoute);
app.use(voterRoute);
app.use(resultRoute)
// Result.alter({true})
// Result.alter({true})
sequelize.sync().then(vote=>{
    app.listen(3005)
    console.log("connected on port 3005")
})
.catch(err=>{
    console.log(err)
})
app.use(adminRoute);
