
import { ApiError } from '../utils/ApiError.js';
import { User } from '../schema/users.js';
import { ApiResponse } from '../utils/ApiResponse.js';


async function createUserData(fullName, coverImageUrl, avatarUrl, email, userName, password) {
  const userData = {
    fullName,
    coverImage: coverImageUrl || '',
    avatar: avatarUrl,
    email,
    userName: userName.toUpperCase(),
    password,
  }; 

  const createdUser = await User.create(userData);
  const cleanedUser = await User.findById(createdUser._id)
    .select('-password -refreshToken');

  if (!cleanedUser) {
    throw new ApiError(500, 'Failed to create user');
  }

  return new ApiResponse(200, cleanedUser, 'User added');
}
export{createUserData}