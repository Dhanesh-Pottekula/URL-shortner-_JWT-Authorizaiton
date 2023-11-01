const mongoose=require("mongoose");
const authschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        },
    role:{
        type:String,
        required:true,
        default:"Normal",
    },
    password:{
        type:String,
        required:true,
    },
    
},{timestamps:true},)

const authmodel= mongoose.model("auth",authschema);

module.exports=authmodel;