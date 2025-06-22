const jwt = require('jsonwebtoken')
//basically we are doing hashing here

const secret = 'saif12'
function setUser(user){
    
    return jwt.sign({
        _id: user?._id,
        email:user?.email,
    },secret)
}

//used in validating
function getUser(token){
    if(!token) return null;
    try {
        //try krenge token bhejne ka
        return jwt.verify(token,secret);
    } catch (error) {
        return null;
    }
}

module.exports={
    setUser,getUser
}