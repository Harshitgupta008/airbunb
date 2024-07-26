import { Link, useParams } from "react-router-dom";

const Place = () => {
    const { action } = useParams()
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
                        <form className="flex flex-col gap-4">
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
                                <label htmlFor="photo" className="mx-3 text-lg">Photo</label>
                                <p className="mx-3 text-sm text-gray-500">image-type = .png/.jpeg/.jpg</p>
                                <input type="text" id="photo" placeholder="Photo Link here..." className="border-2 border-gray-400 px-4 py-3 rounded-full w-full borderDefault" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="descprition" className="mx-3 text-lg">Descprition</label>
                                <p className="mx-3 text-sm text-gray-500">descprition of the place</p>
                                <textarea id="descprition" placeholder="Descprition here ..." className="border-2 border-gray-400 px-4 py-3 rounded-2xl w-full h-48 borderDefault" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="extraInfo" className="mx-3 text-lg">Extra Info</label>
                                <p className="mx-3 text-sm text-gray-500">house rule etc</p>
                                <textarea id="extraInfo" placeholder="Enter Your Extra Information..." className="border-2 border-gray-400 px-4 py-3 rounded-2xl w-full h-40 borderDefault" />
                            </div>
                        </form>
                    </div>
            }
        </>
    )
}
export default Place;