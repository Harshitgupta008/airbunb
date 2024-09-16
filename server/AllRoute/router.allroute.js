import express from "express";
import { Checkget, RegisterUser, LoginUser, GetUser, UpdateUser } from "../Controller/account.controller.js";
import { newPlace, GetPlace, PlaceDetail, AllDetailPlace } from "../Controller/place.controller.js";
import { BookRoom } from "../Controller/booking.controller.js";
import Authentation from "../Middleware/authentation.middleware.js";
import upload from "../Utils/imageUpload.utils.js";

const router = express.Router();

//account controller
router.route("/check").get(Checkget);

router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);

router.route("/UserVerfytoken").get(Authentation,GetUser);
router.route("/UpdateUser/:id").patch(UpdateUser);

// newplase controller
router.route("/addNewPlace").post(Authentation,upload.array('image', 12),newPlace);
router.route("/GetUserPlace").get(Authentation,GetPlace);
router.route("/GetPlaceDetail/:id").get(PlaceDetail);
router.route("/AllPlace").get(AllDetailPlace);

// booking controller
router.route("/bookroom").post(BookRoom);

export default router;