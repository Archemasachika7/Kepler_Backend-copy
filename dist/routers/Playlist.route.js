import { Router } from "express";
import getPlayListVideos from "../controllers/getPlayListVideos.controller.js";
import verifyCoursePurchase from "../controllers/verifyCoursePurchase.controller.js";
const router = Router();
router.route("/getCoursePlaylist").post(getPlayListVideos);
router.route("/verifyCoursePurchase").post(verifyCoursePurchase);
export default router;
