import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

//create token 
dotenv.config();
UserShema.methods.GenrateToken = async function(payload){
    try {
        const token = await jwt.sign(payload,process.env.SECREATE_KEY,{ expiresIn: '20s' });
        return token;
        
    } catch (error) {
        console.log(`error in genrate token part- accountmodles  :: ${error}`)
    }
}

const User = mongoose.model("airbunbUsers",UserShema);



export default User;