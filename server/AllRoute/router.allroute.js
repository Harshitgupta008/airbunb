import express from "express";
import { Checkget, RegisterUser, LoginUser, GetUser } from "../Controller/account.controller.js";
import Authentation from "../Middleware/Authentation.middleware.js";
const router = express.Router();

router.route("/check").get(Checkget);

router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);

router.route("/UserVerfytoken").get(Authentation,GetUser);

export default router;