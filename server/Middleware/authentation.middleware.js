import jwt from "jsonwebtoken";
import User from "../Modles/account.modles.js";
import dotenv from "dotenv";


dotenv.config();

const Authentation = async( req, res, next)=>{
    const token = await req.header("Authorization");
    try {
        if(!token){
            return res.status(400).send("token not found")
        }else{
            // console.log(`token :: ${token}`)
            const jwttokenfix = token.replace("Bearer ","").trim();
            const isVerified = await jwt.verify(jwttokenfix,process.env.SECREATE_KEY);
            const userData = await User.findOne({email:isVerified.email}).select({password:0,cpassword:0})
            
            req.user = userData;
            req.token = token;
            req.userID = userData._id;
            next();

        }
        
    } catch (error) {
        console.log(`error in verify token authontication middleware part :: ${error}`)
    }
}
export default Authentation;