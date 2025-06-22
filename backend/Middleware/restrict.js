const {getUser} = require('../service/auth')
async function restrictToLoggedinUserOnly(req,res,next){
    //will use this func as a middleware to check if we are logged in or not

    const userUid = req.cookies?.uid;
    if(!userUid){
        return res.redirect('/login')
    }
    const user= getUser(userUid);
    if(!user) return res.redirect("/login") //agr user v nhi mila
    req.user = user; //sb sahi rha to req m user dal k next call ke lunga
    next();
}

module.exports={
    restrictToLoggedinUserOnly
}