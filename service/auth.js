const jwt =require("jsonwebtoken");
const secret="dhanesh@2002"

function setUser(user){
    const obj={
        _id: user._id,
        email:user.email,
        role:user.role
    }
    return jwt.sign(obj,secret);
}

function getUser(token){
    try{
        return jwt.verify(token,secret);
    }
    catch{
        return null;}
}

module.exports={setUser,getUser};