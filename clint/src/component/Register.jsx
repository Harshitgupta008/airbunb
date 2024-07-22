import { useNavigate } from "react-router-dom";
const Register = () => {
    const Navigate = useNavigate();
    const Haveaccount = ()=>{
        return Navigate("/login")
    }
    return (
        <>

            <div class="max-w-md mx-auto bg-white px-8 pt-6 mt-20">
                <h2 class="text-center text-2xl font-bold mb-6 text-red-500">Sign Up</h2>
                <form className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="mx-3">Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter Your name" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="mx-3">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter Your email" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="number" className="mx-3">Number</label>
                        <input type="number" id="number" name="number" placeholder="Enter Your number" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="mx-3">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter Your name" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="cpassword" className="mx-3">Correct Password</label>
                        <input type="password" id="cpassword" name="cpassword" placeholder="Enter Your name" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex justify-center items-start">
                        <button className="bg-red-500 w-full p-3 text-white font-bold rounded-full mt-2">Submit</button>
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