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
                owner: req.userID, title, address, photo: Allfile, description, extraInfo, checkIn, checkOut, maxGuests, price
            })
            await data.save();
            return res.status(200).send("data  successfully send")
        }
    } catch (error) {
        console.log(`error find in newplace controller :: ${error}`)
        return res.status(400).send("error in controller")
    }
}

const GetPlace = async (req, res) => {
    const owner = req.userID;
    try {
        const data = await UserPlace.find({ owner });
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(400).send("user not found");
        }
    } catch (error) {
        console.log(`error find in getPlace controller :: ${error}`)
        return res.status(400).send("some error")
    }
}

const PlaceDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await UserPlace.find({ _id: id })
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(400).send("not found id")
        }
    } catch (error) {
        console.log(`error find in PlaceDetail controller :: ${error}`)
        return res.status(400).send("some error")
    }
}

const AllDetailPlace = async (req,res) => {
    try {
        const data = await UserPlace.find({});
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(400).send("not found id")
        }
    } catch (error) {
        console.log(`error find in AllDetailPlace controller :: ${error}`)
        return res.status(400).send("some error")
    }
}

export { newPlace, GetPlace, PlaceDetail, AllDetailPlace };