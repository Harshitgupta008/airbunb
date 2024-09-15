import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Back from "../../img/sideArrow.jpeg"
import CreateBooking from "./CreateBooking";
const UserPlaceDetail = () => {
    const { action } = useParams();
    const [placeDetail, setPlaceDetail] = useState(null);
    const Nevigate = useNavigate();

    const BackPage = () => {
        return Nevigate(-1);
    }
    useEffect(() => {
        const fetchPlaceDetail = async () => {
            const response = await fetch(`/api/GetPlaceDetail/${action}`, {
                method: "GET"
            })
            if (response.ok) {
                const check = await response.json();
                setPlaceDetail(check.data[0]);
            } else {
                return console.log("Id not found")
            }
        }
        fetchPlaceDetail();
    }, [action]);

    if (!placeDetail) {
        return <span className="loader"></span>;
    }

    return (
        <div className="p-4">
            <div className="mb-5 flex items-center justify-start h-fit w-ful">
                <img src={Back} alt="back..." onClick={BackPage} className="h-16 w-16 rotate-180 rounded-full hover:scale-110 cursor-pointer" />
            </div>
            <div className=" py-2 flex justify-center items-center">
                <h1 className="text-3xl font-bold">{placeDetail.title}</h1>
            </div>
            <h1 className="text-lg font-bold mb-5 mt-5">Images ({placeDetail.photo.length})</h1>
            <div className="h-fit w-full px-5 flex  overflow-scroll gap-5 overflow-y-hidden overflow-x-auto">
                {
                    placeDetail.photo.map((photo, i) => (
                        <img src={photo.url} alt="image" className="w-96 h-48 rounded mt-4" key={i}
                        />
                    ))
                }
            </div>
            <div className="text-center w-full h-fit mt-10">
                <p className="text-gray-700 mt-4"> <span className="font-bold">Description : </span>  {placeDetail.description}</p>
            </div>

            <div className="my-10">
                <div className="flex h-fit w-full justify-start gap-8 items-center my-5">
                    <h1 className="font-bold">CheckIn Time : </h1>
                    <p className="text-gray-700 ">{placeDetail.checkIn}</p>
                </div>
                <div className="flex h-fit w-full justify-start gap-5 items-center my-5">
                    <h1 className="font-bold">CheckOut Time : </h1>
                    <p className="text-gray-700 ">{placeDetail.checkOut}</p>
                </div>
                <div className="flex h-fit w-full justify-start gap-5 items-center my-5">
                    <h1 className="font-bold">Maximum Guests are allowed : </h1>
                    <p className="text-gray-700 ">{placeDetail.maxGuests}</p>
                </div>
                <div className="flex h-fit w-full justify-start gap-5 items-center my-5">
                    <h1 className="font-bold">Price : </h1>
                    <p className="text-gray-700 ">₹ {placeDetail.price}/night</p>
                </div>
                <div className="flex h-fit w-full justify-start gap-5 items-center my-5">
                    <h1 className="font-bold">Location : </h1>
                    <p className="text-gray-700 ">{placeDetail.address}</p>
                </div>
            </div>
            <div className="text-center w-full h-fit mt-10 my-5">
                <p className="text-gray-700 mt-4"><span className="font-bold">ExtraInfo : </span>{placeDetail.extraInfo}</p>
            </div>

            <CreateBooking/>
        </div>

    );
}
export default UserPlaceDetail;

