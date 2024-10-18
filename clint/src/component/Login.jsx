import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UseAuth } from "../Auth";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { GenrateToken } = UseAuth();

    const Navigate = useNavigate();
    const Dontaccount = () => {
        return Navigate("/register")
    }
    const LoginUser = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return toast.warn("All field are mendotry")
        }
        try {
            const checkUser = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    email, password
                })
            })
            if (checkUser.status === 200) {
                toast.success("Login successfully");
                const fixtoken = await checkUser.json();
                // console.log(fixtoken.token)
                GenrateToken(fixtoken.token);
                Navigate("/");
                return location.reload();
            } else if (checkUser.status === 400) {
                return toast.error("Check your email and password");
            }
        } catch (error) {
            toast.error("Error/api");
        }

    }
    useEffect(() => {

    }, [GenrateToken])
    return (
        <>
            <div className="max-w-md mx-auto bg-white px-8 pt-6 pb-8 mt-20">
                <h2 className="text-center text-2xl font-bold mb-6 text-red-500">Login</h2>
                <form className="flex flex-col gap-3" onSubmit={LoginUser}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="mx-3">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Your email" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="mx-3">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Your name" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex justify-center items-start">
                        <button type="submit" className="bg-red-500 w-full p-3 text-white font-bold rounded-full mt-2">Submit</button>
                    </div>
                    <div className="flex justify-center items-start ">
                        <h4 onClick={Dontaccount} className="hover:text-red-500 cursor-pointer">Don't have account?</h4>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Login;