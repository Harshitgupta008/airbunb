import User from "../Modles/account.modles.js";
import UserPlace from "../Modles/place.modles.js";


const newPlace = async (req,res)=>{
    const { title, address, description, extraInfo, checkIn, checkOut, maxGuests } = req.body;
    const  owner  = req.userID;

    if( !title || !address || !description || !extraInfo || !checkIn || !checkOut || !maxGuests){
        return res.status(400).send("All field are mendetary");
    }

    try {
        const checkOwner = await User.findById({_id:owner});

        if(!checkOwner){
            return res.status(404).send("User not found");
        }else{
            const data = await new UserPlace({
                owner:req.userID, title, address, description, extraInfo, checkIn, checkOut, maxGuests
            })
            await data.save();
            return res.status(200).send("data  successfully send")
        }
    } catch (error) {
        console.log(`error find in newconsole newplace controller :: ${error}`)
        return res.status(400).send("error in controller")
    }
}

export { newPlace };