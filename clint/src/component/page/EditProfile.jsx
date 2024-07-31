import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UseAuth } from "../../Auth";
import Back from "../../img/sideArrow.jpeg"
const EditProfile = () => {
    const { userData } = UseAuth();
    const Nevigate = useNavigate();
    const [data, setData] = useState({
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const Updateprofile = async (e) => {
        e.preventDefault();
        const { name, email, phoneNumber } = data;
        if (!name || !email || !phoneNumber) {
            return toast.warn("All field are mendetary")
        }
        try {
            const response = await fetch(`/api/UpdateUser/${userData._id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success("Update your data");
                return Nevigate("/about/profile");
            } else if (response.status === 400) {
                return toast.error("user not find check after some time")
            }
        } catch (error) {
            console.log("error in update user :: " + error);
            return toast.error("fetech error/404");
        }
    }

    const BackPage = () => {
        return Nevigate(-1);
    }

    return (
        <>
            <div className=" flex items-center justify-start h-fit w-ful">
                <img src={Back} alt="back..." onClick={BackPage} className="h-16 w-16 mx-6 rotate-180 rounded-full hover:scale-110 cursor-pointer" />
            </div>
            <div className="max-w-md mx-auto bg-white px-8 pt-6 pb-8">
                <h2 className="text-center text-2xl font-bold mb-6 text-red-500">Edit Profile</h2>
                <form className="flex flex-col gap-3" onSubmit={Updateprofile}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="mx-3">Name</label>
                        <input type="text" id="name" name="name" value={data.name} onChange={handleInput} placeholder="Enter Your name" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="mx-3">Email</label>
                        <input type="email" id="email" name="email" value={data.email} onChange={handleInput} placeholder="Enter Your email" className="border-2 border-gray-300 px-4 py-3 rounded-full w-full text-gray-400" disabled />
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