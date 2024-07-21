import { useNavigate } from "react-router-dom";

const Login = () => {
    const Navigate = useNavigate();
    const Dontaccount = ()=>{
        return Navigate("/register")
    }
    return (
        <>
            <div class="max-w-md mx-auto bg-white px-8 pt-6 pb-8 mt-20">
                <h2 class="text-center text-2xl font-bold mb-6 text-red-500">Login</h2>
                <form className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="mx-3">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter Your email" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="mx-3">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter Your name" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex justify-center items-start">
                        <button className="bg-red-500 w-full p-3 text-white font-bold rounded-full mt-2">Submit</button>
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