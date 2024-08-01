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
    address:{
        type:String
    },
    city:{
        type:String
    }
})
const user= mongoose.model('NUser',userSchema)
export default user