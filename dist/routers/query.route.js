import { Router } from 'express';
import { SendQuery } from '../controllers/query.controller.js';
import homePage from '../controllers/extras/homePage.controller.js';
const router = Router();
router.route("/sendquery").post(SendQuery);
router.route('/homePage').get(homePage);
export default router;
