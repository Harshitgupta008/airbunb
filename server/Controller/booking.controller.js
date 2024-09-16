import UserBook from "../Modles/booking.modles.js";

const BookRoom = async (req,res)=>{

    const { coustmer, placeid, name, number, maxguest, checkin} = req.body;
    try {
        if( !coustmer || !placeid || !name || !number || !maxguest || !checkin){
            return res.send("All field are mendatory");
        }

        const response =  new UserBook({
            coustmer : req.body.coustmer,
            placeid : req.body.placeid,
            name : req.body.name,
            number : req.body.number,
            maxguest : req.body.maxguest,
            checkin : req.body.checkin
        });
        await response.save();
        return res.status(200).send("Booking your room")
        
    } catch (error) {
        console.log(`error in booking part- controller  :: ${error}`)
        return res.status(400).send(`find error : ${error}`);
    }

}



export { BookRoom };