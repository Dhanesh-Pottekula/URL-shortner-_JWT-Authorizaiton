const express =require("express");
const router=express.Router();
const {handlershorturl}=require("../controllers/user")



router
.post("/",handlershorturl);

module.exports=
    router;