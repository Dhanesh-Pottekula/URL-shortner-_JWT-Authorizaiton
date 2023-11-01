const express=require("express");                       //default modules
const mongoose=require("mongoose");
const path=require("path");
const shortid = require("shortid");
const { url } = require("inspector");
const cookieparser=require("cookie-parser");


const userRoutes=require("./route/user");               //modules
const userroute=require("./route/userauth");
const {URL} = require("./module/user.js");
const staticRouter=require("./route/staticRouter");

const {mongoConnect}= require("./connection");
const authmodel = require("./module/userauth");
const {checkForAuthuntication,restrictTo}= require("./middleware/auth");

const app =express()
port=3006;


app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({extended:false}));              // middileware

mongoConnect("mongodb://127.0.0.1:27017/shortdb")            // connection
.then(()=>{console.log("mongo connection successfull")})
.catch(()=>{console.log("mongo could not connected ")})

app.use(express.json());
app.use(cookieparser());
//routes

app.use(checkForAuthuntication);
app.use("/",staticRouter);
app.use("/user",userroute)
app.use("/url",restrictTo(["Normal"]),userRoutes)
app.get('/analytics/:id',async (req,res)=>{
    const short_id =req.params.id;
    
    const user= await URL.findOne({short_id});
    console.log(user)
    res.json({totalclicks:user.visithistory.length,
        analytics:user.visithistory});})
        
app.get("/load/:id",async (req,res)=>{
    const short_id=req.params.id;
    console.log(short_id);
    
    const entry = await URL.findOneAndUpdate({short_id:short_id},{
        $push:{
            visithistory:{
                timestamp:Date.now()
            }
        }
    },{new:true});
    console.log(`redirected to ${entry.redirectUrl}`);
    res.redirect('http://' + entry.redirectUrl);
});



app.listen(port,()=>{console.log(`server is listening on ${port} \nURL: http://localhost:${port}/login`)}); 