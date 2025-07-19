import { Router } from "express";
import { registerUser, getUserDetails } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/registerUser").post(upload.fields([
    { name: "avatar", maxCount: 1 }, { name: "coverImage", maxCount: 3 }
]), registerUser);

router.route("/getUserDetails").get(getUserDetails);

export default router;