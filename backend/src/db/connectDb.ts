import mongoose from 'mongoose'
const connectDB= async (URL:string)=> {
    return await mongoose.connect(URL)
}
export default connectDB