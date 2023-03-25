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
let Active="NO";
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
    bcrypt.hash(Password, 12).then(hashedPassword=>{
        Voter.create({
            email:Email,
            nin:Nin,
            name:Name,
            phone:Phone,
            password:hashedPassword,
            active:Active
        }).then(voter=>{
            // voter.resetToken=token;
            // voter.resetTokenExpiration=Date.now() +90000000
            const email={
                to:[user.email, 'newuser@wevote.com'],
                from:{
                    name: 'We- Vote',
                    email:'info@wevote.com.ng'
                },
                subject:'Welcome' +user.name+' thank you for registering',
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