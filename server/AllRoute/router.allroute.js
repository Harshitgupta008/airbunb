import express from "express";
import { Checkget, RegisterUser, LoginUser, GetUser } from "../Controller/account.controller.js";
import { newPlace } from "../Controller/place.controller.js";
import Authentation from "../Middleware/authentation.middleware.js";
import upload from "../Utils/imageUpload.utils.js";

const router = express.Router();

//account controller
router.route("/check").get(Checkget);

router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);

router.route("/UserVerfytoken").get(Authentation,GetUser);

// newplase controller
router.route("/addNewPlace").post(Authentation,upload.array('image', 12),newPlace);

export default router;