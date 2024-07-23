import express from "express";
import { Checkget, RegisterUser, LoginUser } from "../Controller/account.controller.js";
const router = express.Router();

router.route("/check").get(Checkget);
router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);

export default router;