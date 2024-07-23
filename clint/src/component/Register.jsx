import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const [data, setData] = useState({
        name: "", email: "", phoneNumber: "", password: ""
    })
    const [cpassword, setCpassword] = useState("");
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const Submitdata = async (e) => {
        e.preventDefault();
        const { name, email, phoneNumber, password } = data;
        if (!name || !email || !phoneNumber || !password || !cpassword) {
            return toast.warn("All field are mendetory");
        }
        try {
            if (password === cpassword) {
                const newUser = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                if (newUser.status === 200) {
                    toast.success("User Registered Successfully");
                } else if (newUser.status === 402) {
                    toast.error("Server Error");
                } else if (newUser.status === 400) {
                    toast.warn("User Already Exist");
                }
            }else{
                return toast.info("Password Mismatch");
            }
        } catch (error) {
            toast.error("Error/api");
        }

    }
    const Navigate = useNavigate();
    const Haveaccount = () => {
        return Navigate("/login")
    }

    return (
        <>

            <div class="max-w-md mx-auto bg-white px-8 pt-6 mt-20">
                <h2 class="text-center text-2xl font-bold mb-6 text-red-500">Sign Up</h2>
                <form className="flex flex-col gap-3" onSubmit={Submitdata}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="mx-3">Name</label>
                        <input type="text" id="name" name="name" value={data.name} onChange={handleInput} placeholder="Enter Your name" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="mx-3">Email</label>
                        <input type="email" id="email" name="email" value={data.email} onChange={handleInput} placeholder="Enter Your email" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="number" className="mx-3">Number</label>
                        <input type="number" id="number" name="phoneNumber" value={data.phoneNumber} onChange={handleInput} placeholder="Enter Your number" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="mx-3">Password</label>
                        <input type="password" id="password" name="password" value={data.password} onChange={handleInput} placeholder="Enter Your name" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="cpassword" className="mx-3">Correct Password</label>
                        <input type="password" id="cpassword" name="cpassword" value={cpassword} onChange={(e) => setCpassword(e.target.value)} placeholder="Enter Your name" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex justify-center items-start">
                        <button type="submit" className="bg-red-500 w-full p-3 text-white font-bold rounded-full mt-2">Submit</button>
                    </div>
                    <div className="flex justify-center items-start ">
                        <h4 onClick={Haveaccount} className="hover:text-red-500 cursor-pointer">Already have an account?</h4>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;