import User from "../Modles/account.modles.js";
import bcrypt from "bcrypt";

const Checkget = (req, res) => {
    res.send("done controller")
}
//Register User                                                                                     Register User 
const RegisterUser = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    if (!name || !email || !phoneNumber || !password) {
        return res.status(400).send("all field are mendetry");
    }
    try {
        const newUser = new User({
            name, email, phoneNumber, password
        })
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).send("User already exist");
        } else {
            await newUser.save();
            return res.status(200).send("User data submited");
        }

    } catch (error) {
        console.log(`error in register part- controller  :: ${error}`)
        return res.status(402).send("api error")
    }

}

//Login User                                                                                       Login User 
const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("all field are mendetry");
    }
    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            const checkPassword = await bcrypt.compare(password, checkUser.password);
            if (checkPassword) {
                const payload = {
                    _id: checkUser._id,
                    name: checkUser.name,
                    email: checkUser.email,
                    phoneNumber: checkUser.phoneNumber
                }
                const token = await checkUser.GenrateToken(payload);
                return res.status(200).json({ "token": token })
            } else {
                return res.status(400).send("Check password and email")
            }
        } else {
            return res.status(400).send("User doesn't exixt")
        }

    } catch (error) {
        console.log(`error in login part- controller  :: ${error}`)
    }

}

//Get User Authentation                                                                                       Get User Authentation 
const GetUser = async (req, res) => {
    try {
        const data = await req.user;
        return res.status(200).json({ data });
    } catch (error) {
        console.log(`error in GetUSer controller :: ${error}`)
    }
}

const UpdateUser = async (req, res) => {
    const id = await req.params.id;
    try {
        const checkUser = await User.findOne({_id:id});
        if(checkUser){
            await User.findByIdAndUpdate(id,req.body,{new:true});
            return res.status(200).send("update User");
        }else{
            return res.status(400).send("User not find");
        }
    } catch (error) {
        console.log(`error in UpdateUser controller :: ${error}`)
    }
}

export { Checkget, RegisterUser, LoginUser, GetUser, UpdateUser };