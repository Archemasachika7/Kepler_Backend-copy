import { Router } from 'express';
import loginaction from '../controllers/login.controller.js';
import authlogin from '../controllers/authlogin.controller.js';
const router = Router();
router.route('/direct_login').post(loginaction);
router.route('/authlogin').post(authlogin);
export default router;
