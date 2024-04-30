import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../schema/users.js';
import { uploadAtCloudinary } from '../services/couldinary.js';
import { createUser } from '../models/users.js';

const userRegister = asyncHandler(async (req, res) => {
    const { fullName, email, password, userName } = req.body;
    const existingUser = await User.findOne({ userName });
    const localAvatarPath = req.files?.avatar[0].path;
    const localCoverImagePath = req.files?.coverImage.path;

    if ([fullName, email, password, userName].some((find) => find?.trim() === '')) {
        throw new ApiError(400, 'All feild are required');
    }

    if (existingUser) throw new ApiError(404, 'User with user name or email already exist');

    if (!localAvatarPath) throw new ApiError(400, 'Avatar path is missing');

    const avatar = await uploadAtCloudinary(localAvatarPath);
    const coverimage = await uploadAtCloudinary(localCoverImagePath);

    if (!avatar) throw new ApiError(400, 'avatar file is required');

    return await createUser(fullName,coverimage,avatar,email,userName,password);
});

export { userRegister };