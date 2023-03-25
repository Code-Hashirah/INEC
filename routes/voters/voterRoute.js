const router=require('express').Router();
const resultController=require('../../controllers/voters/voters');
const page=require('../../controllers/page')

router.get('/',page.homePage)



module.exports=router;