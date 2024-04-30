import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user-models.js';
import { uploadAtCloudinary } from '../services/couldinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const userRegister = asyncHandler(async (req, res) => {
    const { fullName, email, password, userName } = req.body;
    const existingUser = User.findOne($or[({ userName }, { email })]);
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
    const user = await User.create({
        fullName,
        coverimage: coverimage?.url || '',
        avatar: avatar.url,
        email,
        userName: userName.toUpperCase(),
    });
    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    if (!createdUser) throw new ApiError(500, 'some thing went wrong while creating user');

    return res.status(201).json(new ApiResponse(200, createdUser, 'user added'));
});

export { userRegister };
