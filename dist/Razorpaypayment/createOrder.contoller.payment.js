import { razorpay } from "../index.js";
const createRazorpayOrder = async (req, res) => {
    try {
        const amount = req.body.amount;
        console.log(amount + " is the amount that is to be paid");
        const options = {
            // amount: 1 * 100,
            amount: amount,
            currency: 'INR',
            receipt: "receipt_order_" + Date.now()
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json({
            data: order
        });
    }
    catch (err) {
        console.log("Razorpay Failed");
        res.status(500).json({
            error: "Failed to create Razorpay Order"
        });
    }
};
export default createRazorpayOrder;
