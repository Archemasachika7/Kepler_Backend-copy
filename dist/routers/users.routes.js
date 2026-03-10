import { Router } from 'express';
import { signupaction } from '../controllers/signup.controller.js';
import { otpVerify } from '../controllers/verifyOTP.controller.js';
import allusers from '../controllers/allusers.controller.js';
import deleteFunc from '../controllers/deleteuser.controller.js';
import updateFunc from '../controllers/update.controller.js';
import { authsignupaction } from '../controllers/authsignup.controller.js';
import sendUsers from '../controllers/sendUsers.controller.js';
import userInformation from '../controllers/moreuserInformation.controller.js';
import removeCourse from '../controllers/removeCourse.controller.js';
import getAllCourses from '../controllers/allCourses.controller.js';
import getProfileDetails from '../controllers/GetProfileDetails.controller.js';
const router = Router();
router.route("/signup").post(signupaction);
router.route("/verifyOTP").post(otpVerify);
router.route("/deleteuser").post(deleteFunc);
router.route('/getProfileDetails').post(getProfileDetails);
router.route("/update").post(updateFunc);
router.route('/authsignup').post(authsignupaction);
router.route('/moreInformation').post(userInformation);
router.route('/removeCourse').post(removeCourse);
router.route("/getAllCourses").get(getAllCourses);
router.route("/usernumber").get(async (req, res) => {
    const users = await allusers();
    res.status(200).json({
        number: users.length
    });
});
router.route("/admins").post(sendUsers);
export default router;
