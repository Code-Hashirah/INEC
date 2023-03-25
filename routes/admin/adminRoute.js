const router=require('express').Router();
const adminController=require('../../controllers/auth/auth');

router.get('/admin-login',adminController.adminLogin);
router.post('/admin-login',adminController.adminLogin);

router.get('/admin-register',adminController.adminRegister);

router.post('/admin-register',adminController.adminRegistration)

module.exports=router;