import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = process.env.MONGO_URL;

const data = async () => {
    try {
        await mongoose.connect(db);
        console.log("mongo(data) part done")
    } catch (error) {
        console.log(`error in mongo part :: ${error}`)
    }
}
export default data;