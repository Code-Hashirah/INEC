const voterController=require('../../controllers/voters/voters');
const router=require('express').Router();
const {isEmpty}=require('validator');
const {check}=require('express-validator')

const page=require('../../controllers/page')

router.get('/',page.homePage)
router.get('/register',voterController.registerVoterPage)
router.post('/register', [
check('Email').notEmpty().withMessage('Email cannot be blank').isEmail().withMessage('Invalid Email').normalizeEmail(),
check('Nin').notEmpty().withMessage('NIN must be filled').isNumeric().withMessage('Invalid NIN'),
check('Name').notEmpty().withMessage('Name cannot be empty'),
check('Phone').notEmpty().withMessage('Phone number is required'),
check('Password').notEmpty().withMessage('Password cannot be empty').isLength({min:6}).withMessage('Password must be more than 6 characters long'),
check('ConfirmPass').notEmpty().withMessage('This field cannot be empty').custom((value, {req})=>{
        if(value !==req.body.Password){
            throw new Error ('The Password do not match');
        }
        return true;
})
],voterController.registerVoter)

router.get('/activate/:token', voterController.activatePage)
router.post('/activate', voterController.activate)

router.get('/manage-voters',voterController.manageVoterPage)

router.get('/login',voterController.loginPage)
router.post('/login', [
    check('Email','Invalid credentials').notEmpty().isEmail(),
    check('Password','Invalid credentials').notEmpty()
],voterController.login)
module.exports=router;