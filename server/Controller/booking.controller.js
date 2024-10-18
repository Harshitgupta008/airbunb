import UserBook from "../Modles/booking.modles.js";
import UserPlace from "../Modles/place.modles.js";

const BookRoom = async (req, res) => {

    const { coustmer, placeid, name, number, maxguest, checkin } = req.body;
    try {
        if (!coustmer || !placeid || !name || !number || !maxguest || !checkin) {
            return res.send("All field are mendatory");
        }

        const response = new UserBook({
            coustmer: req.body.coustmer,
            placeid: req.body.placeid,
            name: req.body.name,
            number: req.body.number,
            maxguest: req.body.maxguest,
            checkin: req.body.checkin
        });
        await response.save();
        return res.status(200).send("Booking your room")

    } catch (error) {
        console.log(`error in booking part- controller  :: ${error}`)
        return res.status(400).send(`find error : ${error}`);
    }

}

const getAllBooking = async (req, res) => {
    const coustmer = req.params.coustmer;
    try {
        if (!coustmer) {
            return res.send("All prams are mendatory");
        }

        const bookings = await UserBook.find({ coustmer });
        if (bookings.length === 0) {
            return res.status(404).send("No bookings found for this customer");
        }

        const placeIds = bookings.map((item, i) => { return item.placeid });

        const placesMap = await Promise.all(
            placeIds.map(async (placeId) => {
                return await UserPlace.findById(placeId);
            })
        );
        return res.status(200).json({ bookings, places: placesMap });


    } catch (error) {
        console.log(`error in getAllBooking part- controller  :: ${error}`)
        return res.status(400).send(`find error : ${error}`);
    }
}



export { BookRoom, getAllBooking };