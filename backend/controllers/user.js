// const {v4:uuidv4}=require('uuid')   //v4 ko naam diya h uuidv4
const User = require('../models/authSchema');
const{setUser,getUser}=require('../service/auth')

async function handleUserSignup(req,res){
    
    const{name,email,password}=req.body;
    try {
        await User.create({
            name,
            email,
            password,
        });
        res.json({ success: true, message: 'SignUp successful' });
    } catch (error) {
        console.log(error);
    }

}

async function handleUserLogin(req,res){
    
    const{email,password}=req.body;
    
    const user = await User.findOne({email,password});

    
    if(!user) 
        res.status(401).json({ success: false, message: 'Login Failed' });
    
    const token = setUser(user);  //map it with user

    
    res.cookie('uid',token,{    //uid naam ka cookie create kiya h
        httpOnly:true,
        // domain: 'localhost',
        path:'/',
        sameSite:'Strict'
    });    

    // Send a JSON response instead of redirecting
    res.json({ success: true, message: 'Login successful' });
}
async function handlelogout(req,res){

    res.clearCookie('uid',{
        httpOnly:true,
        // domain:'localhost',
        path:'/',
        sameSite:'Strict'
    });
    res.status(200).json({ success: true, message: 'Logout Successful' });
   
}

async function isauth(req,res){
    
    const token = req.cookies?.uid;
    if(token && getUser(token)){
       return res.status(200).json({authentication:true});
    }
    return res.status(401).json({authentication:false});
}

module.exports ={
    handleUserSignup,
    handleUserLogin,handlelogout,isauth
}