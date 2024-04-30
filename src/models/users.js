
import { ApiError } from '../utils/ApiError.js';
import { User } from '../schema/users.js';
import { ApiResponse } from '../utils/ApiResponse.js';


    async function createUser(fullName,coverImage,avatar,email,userName,password) {
        const user = await User.create({
        fullName,
        coverImage: coverImage?.url || '',
        avatar: avatar.url,
        email,
        userName: userName.toUpperCase(),
        password:password
    });
    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    if (!createdUser) throw new ApiError(500, 'some thing went wrong while creating user');

    return new ApiResponse(200, createdUser, 'user added');
}
export{createUser}