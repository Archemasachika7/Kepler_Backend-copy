import Router from 'express';
import applyCourses from '../controllers/Payments/applyCourses.controller.js';
import currentCoursesFetch from '../controllers/Payments/currentCourses.controller.js';
import userInformation from '../controllers/Payments/userInformation.controller.js';
const router = Router();
router.route('/applyCourses').post(applyCourses);
router.route('/getUserInformation').post(userInformation);
router.route('/getCurrentCourses').post(currentCoursesFetch);
export default router;
