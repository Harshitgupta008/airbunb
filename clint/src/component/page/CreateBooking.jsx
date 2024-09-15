import { useState } from "react";
import { UseAuth } from "../../Auth";
import { useParams } from "react-router-dom";
const CreateBooking = () => {
    const { userData } = UseAuth();
    const { action } = useParams();
    const [bookData, setBookData] = useState({ name:"", number:"", maxguest:"",checkin:"" })
    const HandeleInput = (e)=>{
        const {name, value} = e.target;
        setBookData({...bookData,[name]:value})
    }
    const BookSlot = (e)=>{
        e.preventDefault();
        setBookData({ name:"", number:"", maxguest:"",checkin:"" })
    }
    return (
        <>
            <hr />
            <form onSubmit={BookSlot} className="h-fit py-4 w-full flex justify-center items-center">
                <div className="h-fit p-10 flex justify-center flex-col items-center gap-3  ">
                    <div className="my-4 pb-6 ">
                        <h1 className=" text-2xl font-bold">Book Now</h1>
                        <div className="h-1 bg-red-500 w-12"></div>
                    </div>
                    <div className=" w-full flex flex-wrap gap-3 justify-center items-center">
                        <div className="flex flex-col justify-start w-96  gap-2">
                            <label className="mx-3 text-lg" htmlFor="name">Name</label>
                            <p className="mx-3 text-sm text-gray-500">Enter Your Name</p>
                            <input type="text" name="name" value={bookData.name} onChange={HandeleInput} placeholder="Enter your name" className="border-2 border-gray-300 px-4 py-3 rounded-lg w-full" id="name" />
                        </div>
                        <div className="flex flex-col justify-start w-96  gap-2">
                            <label className="mx-3 text-lg" htmlFor="number">Number</label>
                            <p className="mx-3 text-sm text-gray-500">Enter Your Valid Number</p>
                            <input type="Number" name="number" value={bookData.number} onChange={HandeleInput} placeholder="Enter your number" className="border-2 border-gray-300 px-4 py-3 rounded-lg w-full" id="number" />
                        </div>
                    </div>
                    <div className=" w-full flex flex-wrap gap-3 justify-center items-center">
                        <div className="flex flex-col justify-start w-96  gap-2">
                            <label className="mx-3 text-lg" htmlFor="maxguest">MaxGuests</label>
                            <p className="mx-3 text-sm text-gray-500">Number Of Guests</p>
                            <input type="number" name="maxguest" value={bookData.maxguest} onChange={HandeleInput} placeholder="Number of guest" className="border-2 border-gray-300 px-4 py-3 rounded-lg w-full" id="guest" />
                        </div>
                        <div className="flex flex-col justify-start w-96  gap-2">
                            <label className="mx-3 text-lg" htmlFor="checkin">CheckIn</label>
                            <p className="mx-3 text-sm text-gray-500">CheckIn Date</p>
                            <input type="text" name="checkin" value={bookData.checkin} onChange={HandeleInput} placeholder="CheckIn Date" className="border-2 border-gray-300 px-4 py-3 rounded-lg w-full" id="checkin" />
                        </div>
                    </div>
                    <button type="submit" className="h-fit m-9 w-fit bg-red-500 hover:bg-red-700 text-white px-10 py-2 rounded-lg">Conform</button>
                </div>

            </form>
        </>
    )
}
export default CreateBooking;