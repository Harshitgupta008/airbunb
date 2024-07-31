import { Link, useParams } from "react-router-dom";
import NewPlaceForm from "./NewPlaceForm";
import UserPlaceDetail from "./UserPlaceDetail";
import { useEffect, useState } from "react";
import { UseAuth } from "../../Auth";
const Place = () => {
    const { action } = useParams();
    const { token } = UseAuth();
    const [userPlace, setUserPlace] = useState([]);
    const GetPlace = async () => {
        try {
            const response = await fetch(`/api/GetUserPlace`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }

            })
            if (response.status === 400) {
                return console.log("token error")
            } else if (response.ok) {
                const placeData = await response.json();
                return setUserPlace(placeData.data);
            } else {
                return console.log("error in api calling in GetPlace")
            }

        } catch (error) {
            return console.log(`error in api calling in GetPlace - Auth.jsx :: ${error}`)
        }
    }

    useEffect(() => {
        GetPlace();
    }, [userPlace])

    return (
        <>
            {
                !action ?
                    <>
                        <div className="flex justify-center  items-center w-full h-fit my-4">
                            <Link to={"/about/place/new"} className="text-sm bg-red-500 px-4 py-2 text-white  rounded-full flex h-fit w-fit gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add New Place
                            </Link>
                        </div>
                        <div className=" w-full h-fit flex flex-wrap justify-center items-center gap-5 px-6 mt-10">
                            {
                                userPlace.map((place, i) => {
                                    return (
                                        <div className="w-80 rounded-xl h-80 relative shadow-lg " key={i}>
                                            <div className=" w-full">
                                                <img className="w-full h-40 rounded-t-xl" src={place.photo[0].url} alt="Placeholder" />
                                            </div>
                                            <div className="px-6 py-4">
                                                <div className="font-bold text-xl mb-2 flex justify-center items-center">{place.title}</div>
                                                <p className="text-gray-700 text-base">
                                                    {place.description.substring(0, 75)}...
                                                </p>
                                            </div>
                                            <button className="absolute top-1 right-1   text-white p-2 bg-black bg-opacity-40 rounded-full hover:bg-opacity-80 hover:text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <Link to={`/about/place/${place._id}`} className="absolute bottom-1 right-1 bg-black bg-opacity-40  text-white px-4 py-2 rounded-lg hover:bg-opacity-60">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </Link>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </>
                    :
                    action === "new" ? <NewPlaceForm />
                        :
                        <UserPlaceDetail />

            }
        </>
    )
}
export default Place;