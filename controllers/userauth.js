const authmodel = require("../module/userauth");
const {v4:uuidv4}=require("uuid")
const {setUser}=require("../service/auth");



async function handlesignup(req,res){
    const  {name, email, password}=req.body;
    await authmodel.create({
        name:name,
        email:email,
        password:password,
    });
    
    return res.redirect("/");
}
async function handlelogin(req,res){
    const  {email, password}=req.body;
    const user=await authmodel.findOne({email,password});
    if (!user){
        return res.render("login",{
            error:"Invalid password or email"
        });
    }

const token=setUser(user);
res.cookie("uid",token);
return res.redirect("/");
}

module.exports = {handlesignup,handlelogin};