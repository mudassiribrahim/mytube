import { User } from '../schema/users.js';
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken;
        const refreshToken = user.generateRefreshToken;

        user.refreshToken = refreshToken;
        user.accessToken = accessToken;
        await user.save({
            validateBeforeSave: false,
        });

        return { accessToken, refreshToken };
    } catch (err) {
        throw new ApiError(500, 'something went wrong while generating access and refresh token');
    }
};
const loginUser = asyncHandler(async (req, res) => {
    const { userName, password, email } = req.body;

    if (!userName && !email) throw new ApiError(400, 'userName or email is required');

    const user = await User.findOne({ $or: [{ userName }, { email }] });

    if (!user) throw new ApiError(404, 'user not found');

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) throw new ApiError(400, 'password is incorrect');

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const loggedinUser = await User.findById(user._id).select('-password -refreshToken');
    const cookiesOption = {
        httpOnly: true,
        secure: true,
    }
    return res
        .status(200)
        .cookie('refreshToken', refreshToken, cookiesOption)
        .cookie('accessToken', accessToken, cookiesOption)
        .json(new ApiResponse(200, loggedinUser, 'user logged in successfully'));
});

export { loginUser };
