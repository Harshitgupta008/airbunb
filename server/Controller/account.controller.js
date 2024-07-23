import User from "../Modles/account.modles.js";
import bcrypt from "bcrypt";
const Checkget = (req, res) => {
    res.send("done controller")
}

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
    }
    
}

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password) {
        return res.status(400).send("all field are mendetry");
    }
    try {
        const checkUser = await User.findOne({email});
        if(checkUser){
            const checkPassword = await bcrypt.compare(password,checkUser.password);
            if(checkPassword){
                return res.status(200).send("User login successfully")
            }else{
                return res.status(400).send("Check password and email")
            }
        }else{
            return res.status(400).send("User doesn't exixt")
        }
        
    } catch (error) {
        console.log(`error in login part- controller  :: ${error}`)
    }

}

export { Checkget, RegisterUser, LoginUser };