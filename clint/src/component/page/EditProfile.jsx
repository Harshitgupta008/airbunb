import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../Auth";
const EditProfile = () => {
    const { userData } = UseAuth();
    const Nevigate = useNavigate();
    const [data,setData] = useState({
        name:userData.name,
        email:userData.email,
        phoneNumber:userData.phoneNumber
    })

    const handleInput = (e)=>{
        const {name,value} = e.target;
        setData({ ...data, [name]: value })
    }

    const Updateprofile = (e) => {
        e.preventDefault();
        return Nevigate("/about/profile");
    }
    return (
        <>
            <div className="max-w-md mx-auto bg-white px-8 pt-6 pb-8 mt-10">
                <h2 className="text-center text-2xl font-bold mb-6 text-red-500">Edit Profile</h2>
                <form className="flex flex-col gap-3" onSubmit={Updateprofile}>
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
                    <div className="flex justify-center items-start">
                        <button type="submit" className="bg-red-500 w-full p-3 text-white font-bold rounded-full mt-2">Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditProfile;