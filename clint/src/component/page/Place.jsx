import { Link, useParams } from "react-router-dom";
import NewPlaceForm from "./NewPlaceForm";

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
                    <NewPlaceForm />
            }
        </>
    )
}
export default Place;