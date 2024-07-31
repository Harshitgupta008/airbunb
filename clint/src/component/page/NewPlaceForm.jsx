import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UseAuth } from "../../Auth";
import Back from "../../img/sideArrow.jpeg"
const NewPlaceForm = () => {
    const [allimage, setAllimage] = useState([]);
    const [data, setData] = useState({ title: "", address: "", description: "", extraInfo: "", checkIn: "", checkOut: "", maxGuests: "", price: "" })
    const { token } = UseAuth();
    const Nevigate = useNavigate();
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const AddPhoto = (e) => {
        const file = e.target.files[0]
        setAllimage((prev) => [...prev, file]);
    }
    const Deleteimage = (i) => {
        const deletimg = allimage.filter((ele, id) => {
            return id !== i;
        })
        return setAllimage(deletimg);
    }

    const AddData = async (e) => {
        e.preventDefault();
        const { title, address, description, extraInfo, checkIn, checkOut, maxGuests, price } = data;
        if (!title || !address || !description || !extraInfo || !checkIn || !checkOut || !maxGuests || !price) {
            return toast.warn("All field are mendetary");
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("address", address);
        formData.append("description", description);
        formData.append("extraInfo", extraInfo);
        formData.append("checkIn", checkIn);
        formData.append("checkOut", checkOut);
        formData.append("maxGuests", maxGuests);
        formData.append("price", price);

        allimage.forEach((image, index) => {
            formData.append(`image`, image);
        });

        try {
            const response = await fetch(`/api/addNewPlace`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (response.ok) {
                setData({ title: "", address: "", description: "", extraInfo: "", checkIn: "", checkOut: "", maxGuests: "", price: "" })
                setAllimage([]);
                return toast.success("Your place added");
            } else if (response.status === 404) {
                return toast.error("user not found wait some time");
            } else if (response.status === 400) {
                return window.alert("fetching error : 404//")
            }
        } catch (error) {
            window.alert("fetching error : " + error)
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
            <div className="w-full h-fit my-4 px-4 py-3 ">
                <form className="flex flex-col gap-4" onSubmit={AddData} encType="multipart/form-data">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title" className="mx-3 text-lg">Title</label>
                        <p className="mx-3 text-sm text-gray-500">Title of house</p>
                        <input type="text" id="title" placeholder="Enter title" className="border-2  px-4 py-3 rounded-full w-full borderDefault" name="title" value={data.title} onChange={handleInput} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="address" className="mx-3 text-lg">Address</label>
                        <p className="mx-3 text-sm text-gray-500">address to the place</p>
                        <input type="text" id="address" placeholder="Enter Your Address" className="border-2 border-gray-400 px-4 py-3 rounded-full w-full borderDefault" name="address" value={data.address} onChange={handleInput} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="mx-3 text-lg">Photo</label>
                        <p className="mx-3 text-sm text-gray-500">upload multiple image, image-type = .png/.jpeg/.jpg.</p>

                        <div className="w-full h-fit flex items-center mt-2 gap-3 flex-wrap">
                            {
                                allimage.map((ele, i) => {
                                    return (
                                        <>
                                            <div key={i} className="w-32 h-32 rounded-md relative">
                                                <img src={ele ? URL.createObjectURL(ele) : ''} alt="" className="w-32 h-32 rounded-md " name="image" />
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute bottom-1 right-1 text-white bg-black bg-opacity-50 p-1 rounded-full hover:bg-white hover:text-black hover:bg-opacity-50 cursor-pointer" onClick={() => Deleteimage(i)}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <label htmlFor="addphoto" className="flex justify-center items-center gap-3 border-2 border-gray-400 h-24 rounded-2xl mt-4 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>
                            Upload Image
                        </label>
                        <input type="file" id="addphoto" placeholder="Photo Link here..." className="border-2 border-gray-400 px-4 py-3 rounded-full w-full borderDefault hidden" accept="image/*" onChange={AddPhoto} />
                    </div>



                    <div className="flex flex-col gap-1">
                        <label htmlFor="description" className="mx-3 text-lg">Description</label>
                        <p className="mx-3 text-sm text-gray-500">description of the place</p>
                        <textarea id="description" placeholder="Description here ..." className="border-2 border-gray-400 px-4 py-3 rounded-2xl w-full h-40 borderDefault" name="description" value={data.description} onChange={handleInput} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="extraInfo" className="mx-3 text-lg">Extra Info</label>
                        <p className="mx-3 text-sm text-gray-500">house rule etc</p>
                        <textarea id="extraInfo" placeholder="Enter Your Extra Information..." className="border-2 border-gray-400 px-4 py-3 rounded-2xl w-full h-40 borderDefault" name="extraInfo" value={data.extraInfo} onChange={handleInput} />
                    </div>

                    <div className="flex flex-row gap-4 justify-around items-center flex-wrap mt-7 mb-10">
                        <div>
                            <label htmlFor="checkIn" className="mx-3 text-lg">CheckIn</label>
                            <p className="mx-3 text-sm text-gray-500">Enter checkIn time</p>
                            <input type="text" id="checkIn" className="border-2 border-gray-400 px-4 py-3 rounded-2xl w-44  borderDefault" name="checkIn" value={data.checkIn} onChange={handleInput} />
                        </div>
                        <div>
                            <label htmlFor="checkOut" className="mx-3 text-lg">CheckOut</label>
                            <p className="mx-3 text-sm text-gray-500">enter checkOut time</p>
                            <input type="text" id="checkOut" className="border-2 border-gray-400 px-4 py-3 rounded-2xl w-44  borderDefault" name="checkOut" value={data.checkOut} onChange={handleInput} />
                        </div>
                        <div>
                            <label htmlFor="Guestsnumber" className="mx-3 text-lg">MaxGuests</label>
                            <p className="mx-3 text-sm text-gray-500">enter number of Guests</p>
                            <input type="number" id="Guestsnumber" className="border-2 border-gray-400 px-4 py-3 rounded-2xl w-44  borderDefault" name="maxGuests" value={data.maxGuests} onChange={handleInput} />
                        </div>
                        <div>
                            <label htmlFor="Price" className="mx-3 text-lg">Price</label>
                            <p className="mx-3 text-sm text-gray-500">enter price of your place</p>
                            <input type="number" id="Price" className="border-2 border-gray-400 px-4 py-3 rounded-2xl w-44  borderDefault" name="price" value={data.price} onChange={handleInput} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <button type="submit" className="w-full h-fit py-2 bg-red-500 rounded-full text-white">Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewPlaceForm;