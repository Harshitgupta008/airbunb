import mongoose from "mongoose"

const BookSchena = new mongoose.Schema({
    coustmer: {
        type: mongoose.Schema.Types.ObjectId,
    },
    placeid: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        require : true
    },
    number: {
        type: Number,
        require : true
    },
    maxguest: {
        type: Number,
        require : true
    },
    checkin: {
        type: String,
        require : true
    },
}, { timestamps: true })

const UserBook = mongoose.model("booking",BookSchena);

export default UserBook;