import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'json-web-token';
import { User } from '../schema/users.js';

 const verifyJwt = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers?.authorization?.split(' ')[1];

        if (!token) throw new ApiError(401, 'unauthorized request');

        const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);

        const user = await User.findById(decodedToken._id).select('-password -refreshToken');

        if (!user) throw new ApiError(401, 'unauthorized request');

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || 'unauthorized request');
    }
});

export { verifyJwt };
