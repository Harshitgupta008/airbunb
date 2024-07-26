import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Place = () => {
    const { action } = useParams()
    const [allimage, setAllimage] = useState([]);
    const Adddata = (e) => {
        e.preventDefault();
    }
    const AddPhoto = (e) => {
        const file = e.target.files[0]
        setAllimage((prev) => [...prev, file]);
    }
    return (
        <>
            {
                !action ?
                    <div className="flex justify-center  items-center w-full h-fit my-4 ">
                        <Link to={"/about/place/new"} className="text-sm bg-red-500 px-4 py-2 text-white  rounded-full flex h-fit w-fit gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add New Place
                        </Link>
                    </div>
                    :
                    <div className="w-full h-fit my-4 px-4 py-3 ">
                        <form className="flex flex-col gap-4" onSubmit={Adddata}>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="mx-3 text-lg">Title</label>
                                <p className="mx-3 text-sm text-gray-500">Title of house</p>
                                <input type="text" id="title" placeholder="Enter title" className="border-2  px-4 py-3 rounded-full w-full borderDefault" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="address" className="mx-3 text-lg">Address</label>
                                <p className="mx-3 text-sm text-gray-500">address to the place</p>
                                <input type="text" id="address" placeholder="Enter Your Address" className="border-2 border-gray-400 px-4 py-3 rounded-full w-full borderDefault" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="mx-3 text-lg">Photo</label>
                                <p className="mx-3 text-sm text-gray-500">upload multiple image, image-type = .png/.jpeg/.jpg.</p>

                                <div className="w-full h-fit  flex items-center px-3 py-3 gap-3 flex-wrap">
                                    {
                                        allimage.map((ele, i) => {
                                            return (
                                                <>
                                                    <div key={i} >
                                                        <img src={ele ? URL.createObjectURL(ele) : ''} alt="" className="w-32 h-32 rounded-md" />
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>

                                <label htmlFor="addphoto" className="flex justify-center items-center gap-3 border-2 border-gray-400 h-24 rounded-2xl mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                    </svg>
                                    Upload Image
                                    </label>
                                <input type="file" id="addphoto" placeholder="Photo Link here..." className="border-2 border-gray-400 px-4 py-3 rounded-full w-full borderDefault hidden" accept="image/*" onChange={AddPhoto} />
                                
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="descprition" className="mx-3 text-lg">Descprition</label>
                                <p className="mx-3 text-sm text-gray-500">descprition of the place</p>
                                <textarea id="descprition" placeholder="Descprition here ..." className="border-2 border-gray-400 px-4 py-3 rounded-2xl w-full h-40 borderDefault" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="extraInfo" className="mx-3 text-lg">Extra Info</label>
                                <p className="mx-3 text-sm text-gray-500">house rule etc</p>
                                <textarea id="extraInfo" placeholder="Enter Your Extra Information..." className="border-2 border-gray-400 px-4 py-3 rounded-2xl w-full h-40 borderDefault" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <button className="w-full h-fit py-2 bg-red-500 rounded-full text-white">Save</button>
                            </div>
                        </form>
                    </div>
            }
        </>
    )
}
export default Place;