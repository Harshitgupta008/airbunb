import mongoose from "mongoose";
const PlaceShema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    title: {
        type: String,
        require: true
    },
    Address: {
        type: String,
        require: true
    },
    photo: [String],
    descprition: {
        type: String,
        require: true
    },
    extrainfo: {
        type: String,
    },
    checkIn: {
        type: Number
    },
    checkOut: {
        type: Number
    },
    maxGuests: {
        type: Number
    },
    price: {
        type: Number
    },
}, { timestamps: true })
const UserPlace = mongoose.model("place", PlaceShema);



export default UserPlace;