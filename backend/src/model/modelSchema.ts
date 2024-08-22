import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
    },
    contact:{
        type:Number,
    },
    addressLine1:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    }
})
const user= mongoose.model('NUser',userSchema)
export default user