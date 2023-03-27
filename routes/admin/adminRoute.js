const router=require('express').Router();
const adminController=require('../../controllers/auth/auth');
const candidatesController= require('../../controllers/auth/candidates')
router.get('/admin-login',adminController.adminLogin);
router.post('/admin-login',adminController.adminLogin);

router.get('/admin-register',adminController.adminRegister);

router.post('/admin-register',adminController.adminRegistration)

router.get('/add-candidates',candidatesController.addCandidatesPage)
router.post('/add-candidates', candidatesController.addCandidates)
module.exports=router;