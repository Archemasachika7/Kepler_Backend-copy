import Router from "express";
import createRazorpayOrder from "../Razorpaypayment/createOrder.contoller.payment.js";
import verifyPayment from "../Razorpaypayment/verifyPayment.controller.payment.js";
const router = Router();
router.route('/create-order').post(createRazorpayOrder);
router.route('/verify-order').post(verifyPayment);
export default router;
