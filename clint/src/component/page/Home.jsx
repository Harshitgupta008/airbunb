import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [placeDetail, setPlaceDetail] = useState([]);

    useEffect(() => {
        const fetchPlaceDetail = async () => {
            const response = await fetch(`/api/AllPlace`, {
                method: "GET"
            })
            if (response.ok) {
                const check = await response.json();
                setPlaceDetail(check.data);
            } else {
                return console.log("Id not found")
            }
        }
        fetchPlaceDetail();
    }, [placeDetail]);
    if(!placeDetail){
        return <span className="loader"></span>
    }
    return (
        <>
            <div className="flex flex-wrap gap-4 mt-28 justify-center items-center">
                {
                    placeDetail.map((place, i) => {
                        return (
                            <Link to={`/about/place/${place._id}`} key={i} className="w-80 rounded-xl h-80 shadow-2xl rounded-b-lg  relative cursor-pointer">
                                <img src={place.photo[0].url} alt="" className="w-full rounded-t-xl h-60" />
                                <div className="h-16  rounded-b-lg flex flex-col gap-2 py-2">
                                    <div className="flex gap-2 px-2">
                                        <h1 className="font-bold">Location : </h1>
                                        <p>{place.address}</p>
                                    </div>
                                    <div className="flex gap-2 px-2">
                                        <h1 className="font-bold">Price : </h1>
                                        <p>₹ {place.price}/night</p>
                                    </div>
                                </div>
                                <div className="absolute top-2 right-2 font-bold bg-white rounded-full p-2 bg-opacity-75 hover:bg-opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="absolute bottom-2 right-2 font-bold bg-white rounded-full p-2 bg-opacity-75 hover:bg-opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-500">
                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                    </svg>


                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            
        </>
    )
}
export default Home;

