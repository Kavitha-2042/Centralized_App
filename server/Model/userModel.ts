import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    privateKey:{
        type:String
    }
})

export default mongoose.model("user",userSchema)