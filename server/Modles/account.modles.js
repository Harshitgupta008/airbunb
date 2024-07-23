import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt"
const UserShema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
},{timestamps:true})

UserShema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

const User = mongoose.model("airbunbUsers",UserShema);


dotenv.config();

export default User;