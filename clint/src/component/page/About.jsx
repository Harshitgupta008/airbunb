import { Link, useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../img/default_image.png"
import Place from "./Place";
import Booking from "./Booking";
import Error from "../Error";
import { UseAuth } from "../../Auth";
import { useEffect } from "react";
import EditProfile from "./EditProfile";
const About = () => {
    const { LoggoutUser } = UseAuth();
    const Nevigate = useNavigate();
    const { isLoggedIn } = UseAuth();
    const { userData } = UseAuth();
    let { subpage } = useParams();
    let { action } = useParams();
    if(subpage === undefined){
        subpage = "profile"
    }
    const clickbutton = (type = null) => {
        let classes = "text-sm bg-white px-6 py-2 text-black   rounded-full";
        if (type === subpage) {
            classes = "text-white bg-red-500 text-sm  px-6 py-2   rounded-full";

        }
        return classes;
    }

    const Loggout = () => {
        LoggoutUser();
        return Nevigate("/login")
    }
    useEffect(() => {

    }, [LoggoutUser])
    return (
        <>
            {
                !isLoggedIn ?
                    <Error />
                    :
                    <>
                        <div className="w-full h-fit  px-4 py-5    mt-24 flex gap-2 justify-center font-bold   items-center">
                            <Link to={"/about/profile"} className={clickbutton("profile")}>Profile</Link>
                            <Link to={"/about/booking"} className={clickbutton("booking")}>Booking</Link>
                            <Link to={"/about/place"} className={clickbutton("place")}>Residence</Link>
                        </div>
                        {
                            subpage === "profile" && (
                                <div>
                                    {
                                        !action ?
                                            <>
                                                <div className="flex flex-col justify-center items-center gap-8 text-center mt-14">
                                                    <div className="h-40 w-40 rounded-full">
                                                        <img src={defaultImage} alt="display-picture" className="h-40 w-40 rounded-full" />
                                                    </div>
                                                    <div className="flex justify-center flex-col items-center gap-4">
                                                        <div className=" w-full h-fit py-1 flex px-4  items-center flex-wrap gap-5 ">
                                                            <h1>Name :</h1>  <h1>{userData.name}</h1>
                                                        </div>
                                                        <div className=" w-full h-fit py-1 flex px-4  items-center flex-wrap gap-5">
                                                            <h1>Email :</h1>  <h1>{userData.email}</h1>
                                                        </div>
                                                        <div className=" w-full h-fit py-1 flex px-4  items-center flex-wrap gap-5">
                                                            <h1>Number :</h1>  <h1>{userData.phoneNumber}</h1>
                                                        </div>

                                                    </div>
                                                    <Link to={"/about/profile/editprofile"} className="bg-red-500 bg-opacity-30 w-80 py-2 rounded-full black hover:bg-red-300 ">Edit Profile</Link>
                                                    <button className="bg-red-600 w-80 py-2 rounded-full text-white hover:bg-red-500" onClick={Loggout}>Logout User</button>
                                                </div>
                                            </>
                                            :
                                            <EditProfile />
                                    }

                                </div>
                            )
                            || subpage === "booking" && <Booking />
                            || subpage === "place" && <Place />
                        }

                    </>
            }


        </>
    )
}

export default About;