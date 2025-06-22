const express = require('express')
const{handleUserSignup,handleUserLogin,handlelogout,isauth}=require('../controllers/user')


const router= express.Router();

router.post("/signup",handleUserSignup);
router.post("/login",handleUserLogin);
router.post("/logout",handlelogout);
router.post("/isauth",isauth);



module.exports=router;