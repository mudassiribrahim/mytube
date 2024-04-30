import { Router } from 'express';
import { userRegister } from '../controllers/users-controller.js';
import { upload } from '../middlewares/multer_middelware.js';

const router = Router();

router.route('/register').post(
    upload.fields(
        [{
            name: 'avatar',
            maxCount: 1
        },
        {
            nmae : 'coverImage',
            maxCount: 1
        }

]
),
userRegister
);

export default router;
