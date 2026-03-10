import { Router } from "express";
import createNewAccessToken from "../auths/sendNewRefreshToken.js";
const router = Router();
router.route("/newAccessToken").post(createNewAccessToken);
export default router;
