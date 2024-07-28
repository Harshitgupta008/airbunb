import mongoose from "mongoose";
const PlaceShema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
    },
    title: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    photo: [{}],
    description: {
        type: String,
        require: true
    },
    extraInfo: {
        type: String,
        require:true
    },
    checkIn: {
        type: String,
        require:true
    },
    checkOut: {
        type: String,
        require:true
    },
    maxGuests: {
        type: Number,
        require:true
    },
    price: {
        type: Number,
        require:true
    },
}, { timestamps: true })

const UserPlace = mongoose.model("place", PlaceShema);

export default UserPlace;