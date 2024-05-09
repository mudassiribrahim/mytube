import { Router } from 'express';
import { userRegister } from '../controllers/user-controller.js';
import { upload } from '../middlewares/multer_middelware.js';
import { loginUser } from '../controllers/loginUser-controller.js';
import { verifyJwt } from '../middlewares/auth-middelware.js';
import { loggedOutUser } from '../controllers/logoutUser-conttrolle.js';

const router = Router();

router.route('/register').post(
    upload.fields(
        [{
            name: 'avatar',
            maxCount: 1
        },
        {
            name : 'coverImage',
            maxCount: 1
        }

]
),
userRegister
);
router.route('/login').post(loginUser);

router.route('/logout').post(verifyJwt,loggedOutUser);


export default router;
