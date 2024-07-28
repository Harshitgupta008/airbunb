import User from "../Modles/account.modles.js";
import UserPlace from "../Modles/place.modles.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});


const newPlace = async (req, res) => {
    const { title, address, description, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
    const owner = req.userID;

    if (!title || !address || !description || !extraInfo || !checkIn || !checkOut || !maxGuests || !price) {
        return res.status(400).send("All field are mendetary");
    }

    try {
        const checkOwner = await User.findById({ _id: owner });

        if (!checkOwner) {
            return res.status(404).send("User not found");
        } else {

            // image send in coludinary
            const uploadimage = req.files.map(async (file) => {
                try {
                    const uploadResult = await cloudinary.uploader.upload(file.path);
                    fs.unlinkSync(file.path);
                    return {
                        url: uploadResult.secure_url,
                        public_id: uploadResult.public_id
                    };
                } catch (error) {
                    console.error('Error uploading to Cloudinary in newplace:', error);
                    fs.unlinkSync(file.path);
                }
            });
            const Allfile = await Promise.all(uploadimage);

            const data = await new UserPlace({
                owner: req.userID, title, address, photo:Allfile, description, extraInfo, checkIn, checkOut, maxGuests, price
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