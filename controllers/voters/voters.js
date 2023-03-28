const Voter = require('../../models/voters/voter')
const session= require('express-session')
const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator/check')
const nodemailer=require('nodemailer')
const crypto=require('crypto')
exports.registerVoterPage=(req,res)=>{
    let errors=req.flash('errors');
    res.render('voters/registration', {title:"We-Vote::Register", ErrorMsg:errors})
}

exports.registerVoter=(req,res)=>{
const {Email, Nin, Name, Phone, Password}=req.body
let errors=validationResult(req)
if(!errors.isEmpty()){
    req.flash('errors', errors.array())
    return req.session.save(()=>{
        return res.redirect('/register')
    })
}
crypto.randomBytes(32, (err, buffer)=>{
    if(err){
        req.flash('userErr', 'Unable to perfom this action')
        req.session.save(()=>{
            res.redirect('/register')
        })
    }
    let token=buffer.toString('hex');
    console.log(buffer)
    bcrypt.hash(Password, 12).then(hashedPassword=>{
        let Active="NO"
        Voter.create({
            email:Email,
            nin:Nin,
            name:Name,
            phone:Phone,
            password:hashedPassword,
            activated:Active,
            token:token
        }).then(voter=>{
            // voter.resetToken=token;
            // voter.resetTokenExpiration=Date.now() +90000000
            const email={
                to:[voter.email, 'newuser@wevote.com'],
                from:{
                    name: 'We- Vote',
                    email:'info@wevote.com.ng'
                },
                subject:'Welcome' +voter.name+' thank you for registering',
                html:`
                <h2> Activate your account </h2>
                <p> <a href="http:/localhost:3005/activate/${token}"> Activate</a> </p>
                `
            }
            var transport=nodemailer.createTransport({
                host:"sandbox.smtp.mailtrap.io",
                port:2525,
                auth:{
                    user: "58b42af4ae2024",
                    pass: "822d08109dd72d"
                }
            })
            transport.sendMail(email).then((response)=>{
                res.redirect('/')
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
})
}


exports.activatePage=(req,res)=>{
    const Token = req.params.token;
 Voter.findOne({
    where:{
        token:Token
    }
 }).then(voter=>{
    console.log(voter)
    res.render('voters/activate', {title:"We-Vote::activation", Voters:voter})
 })   
}

exports.activate=(req,res)=>{
    const {Email}=req.body;
    Voter.findOne({
        where:{
            email:Email
        }
    }).then(voter=>{
        voter.activated="YES"
        return voter.save()
    }).then(voter1=>{
        return res.redirect('/login')
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.manageVoterPage=(req,res)=>{
    Voter.findAll().then(voters=>{
        res.render('admin/manage-voters', {title:"Manage voters", Voters:voters})
    })
}

exports.loginPage=(req,res)=>{
    let errors=req.flash('errors')
    res.render('voters/login', {title:"We-Vote::Login", ErrorMsg:errors})
}

exports.login=(req,res)=>{
    const {Email, Password}=req.body;
    errors=validationResult(req);
    if(!errors.isEmpty()){
        req.flash('errors', errors.array())
        // return req.sessiom.save(()=>{
        //     res.redirect('/login')
        // })
    return   res.redirect('/login')
    }
    Voter.findOne({
        where:{
            email:Email,
            activated:"YES"
        }
    }).then(voter=>{
        if(!voter){
            req.flash('loginErr', 'Invalid username or password')
            return req.session.save(()=>{
                res.redirect('/login')
            })
        }
        bcrypt.compare(Password,voter.password).then(verify=>{
            if(!verify){
                req.flash('loginErr', 'Invalid username or password')
                return req.session.save(()=>{
                    res.redirect('/login')
                })
            }
            req.session.isLoggedIn=true;
            req.session.voter=voter
            res.redirect('/')
        })
    })
}