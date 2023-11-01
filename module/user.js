const mongoose =require("mongoose");

const schema= mongoose.Schema({
    short_id:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true,
        unique:true,
    },
    visithistory:[{
           timestamp:{type:Number}}],
    },{ timeStamps:true},
);


const URL=mongoose.model("USER-URL",schema);

module.exports={URL};