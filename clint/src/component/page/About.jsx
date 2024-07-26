import { Link, useParams } from "react-router-dom";
import defaultImage from"../../img/default_image.png"
import Place from "./Place";
import Booking from "./Booking";
import { UseAuth } from "../../Auth";
import { useEffect } from "react";
const About = () => {
    const { LoggoutUser } = UseAuth();
    // const { userData } = UseAuth();
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile";
    }
    const clickbutton = (type = null) => {
        let classes = "text-sm bg-white px-6 py-2 text-black   rounded-full";
        if (type === subpage) {
            classes = "text-white bg-red-500 text-sm  px-6 py-2   rounded-full";

        }
        return classes;
    }
    useEffect(()=>{

    },[LoggoutUser])
    return (
        <>
            <div className="w-full h-fit  px-4 py-5    mt-24 flex gap-2 justify-center font-bold   items-center">
                <Link to={"/about"} className={clickbutton("profile")}>Profile</Link>
                <Link to={"/about/booking"} className={clickbutton("booking")}>Booking</Link>
                <Link to={"/about/place"} className={clickbutton("place")}>Accomondations</Link>
            </div>
            {
                subpage === "profile" && (
                    <div className="flex flex-col justify-center items-center gap-8 text-center mt-14">
                        <img src={defaultImage} alt="display-picture" className="h-40 w-40 rounded-full " />
                        <div className="flex justify-center flex-col items-center gap-4">
                            <h1>
                                Name : Harshit
                            </h1>
                            <h1>

                                Email : Harshit@gmail.com
                            </h1>
                            <h1>
                                Phonenumber : 1723765623
                            </h1>
                        </div>
                        <button className="bg-red-500 px-28 py-2 rounded-full text-white" onClick={LoggoutUser}>Logout User</button>
                    </div>
                )
                || subpage === "booking" &&  <Booking/>
                || subpage === "place" &&  <Place/>
            }
           
            

        </>
    )
}

export default About;