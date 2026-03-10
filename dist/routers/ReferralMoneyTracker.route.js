import Router from "express";
import getAllReferralMoney from "../controllers/AdminReferralController/getAllMoneyTansfers.controller.js";
import confirmReferralMoneyTransfer from "../controllers/AdminReferralController/confirmMoneyTransfer.controller.js";
import checkAdminAccess from "../controllers/AdminReferralController/CheckAdminAccess.controller.js";
const router = Router();
router.route("/getAllMoneyTransfers").post(getAllReferralMoney);
router.route("/confirmMoneyTransfer").post(confirmReferralMoneyTransfer);
router.route("/checkAdminAccess").post(checkAdminAccess);
export default router;
