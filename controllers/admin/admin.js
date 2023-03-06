const Admin=require('../../models/admin/admin');




// imports end Headers....
exports.adminLogin=(req,res)=>{
    res.render('admin/login')
}

exports.adminLogin=(req,res)=>{
    const {Email,Password}=req.body;
    Admin.findAll()
    .then(result=>{
        if(result.email=Email && result.password==Password){
            res.redirect('/admin-dashboard')
        }
        else{
            window.alert("Error, Invalid credentials")
            res.redirect('/')
        }
    })
}

exports.adminRegister=(req,res)=>{
    res.render('admin/registration')
}

exports.adminRegistration=(req,res)=>{
    const {Name,Phone,Image,Email,Password,ConfirmPassword}=req.body;
    Admin.create({
        names:Name,
        phone:Phone,
        pic:Image,
        email:Email,
        password:Password,
        confirmPassword:ConfirmPassword
    });
    res.redirect('/admin-dashboard')
    // res.json({success:'successfull'})
}