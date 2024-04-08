import { Router } from 'express';
import { userRegister } from '../controllers/users-controller.js';

const router = Router();

router.route('/register').post(userRegister);

export default router;
