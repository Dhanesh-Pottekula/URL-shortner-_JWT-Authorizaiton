const shortid =require("shortid");
const {URL} = require("../module/user");

async function handlershorturl(req,res){
    console.log("handlerfunction called");
    const short_id=  shortid();
    const body=req.body;
    if(!body.url)return res.json("error url is required");
    
    await URL.create({
        short_id:short_id,
        redirectUrl:body.url,
        visithistory:[],
    });
    return res.render("home",{id:short_id});
    
}

module.exports={
    handlershorturl
}