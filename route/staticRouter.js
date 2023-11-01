const express=require("express");
const { route } = require("./user.js");
const router=express.Router();

router.get("/",async (req,res)=>{
    const {URL} = require("../module/user.js");
    const allurls=await URL.find({});

    return res.render("home",{
        urls:allurls,
    });
})
router.get("/signup",(req,res)=>{
    return res.render("signup");
});
router.get("/login",(req,res)=>{
    return res.render("login");
});
module.exports=
    router;