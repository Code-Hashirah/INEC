const router=require('express').Router();
const {isEmpty}=require('validator');
const {check}=require('express-validator');
const adminPageController=require('../../controllers/page')
const adminController=require('../../controllers/auth/auth');
const candidatesController= require('../../controllers/auth/candidates')
router.get('/admin-login',adminController.adminLogin);
router.post('/admin-login',adminController.adminLogin);

router.get('/admin-register',adminController.adminRegister);

router.post('/admin-register',adminController.adminRegistration)

router.get('/add-candidates',candidatesController.addCandidatesPage)
router.post('/add-candidates',[
    check('Name').notEmpty().withMessage('Name cannot be left empty'),
    check('Age').notEmpty().withMessage('Age cannot be empty').custom((value, {req})=>{
        if(value>100||value<=34 ){
            throw new Error('The Age is invalid')
        }
        return true;
    }),
    check('Dob').notEmpty().withMessage('Date of Birth cannot empty').custom((value, {req})=>{
        if(value >= Date.now()-1103760000000){
            throw new Error('The Date of birth is invalid')
        }
        return true;
    }),
    check('Party').notEmpty().withMessage('Party cannot be empty').isLength({max:5}).withMessage('Invalid Party name'),
    check('Contesting').notEmpty().withMessage('This cannot be empty')
], candidatesController.addCandidates)

router.get('/admin-dashboard',adminPageController.adminDashboardPage)
module.exports=router;