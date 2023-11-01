const {getUser}= require("../service/auth");

const express=require("express"); 
const app =express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());


function checkForAuthuntication(req,res,next){
    const tokencookie=req.cookies?.uid;

    if(!tokencookie){
         return next()
        }
        const token = tokencookie
        const user=getUser(token)
        req.user=user;
        return next();
    }



//ADMIN RISTRICTION

function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");

        if (!req.user.role)return res.end("Unauthorized --->need to login first");
        return next();
    };
}


module.exports = {checkForAuthuntication,restrictTo}