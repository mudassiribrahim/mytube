
import { ApiError } from '../utils/ApiError.js';
import { User } from '../schema/users.js';
import { ApiResponse } from '../utils/ApiResponse.js';



/**
 * This function creates a new user in the database. It takes in several parameters:
 * - fullName: The user's full name.
 * - coverImageUrl: The URL of the user's cover image. Defaults to an empty string if not provided.
 * - avatarUrl: The URL of the user's avatar image.
 * - email: The user's email address.
 * - userName: The user's username. It is automatically converted to uppercase.
 * - password: The user's password.
 * 
 * The function first creates a user object with all the provided data. 
 * Then it calls the User.create() method to create the user in the database.
 * After that, it retrieves the user from the database, but excludes the password and refreshToken fields.
 * If the user was not found in the database, an ApiError is thrown.
 * Finally, the function returns a new ApiResponse object with the status code 200,
 * the cleanedUser object, and the message 'User added'.
 */
async function createUserData(fullName, coverImageUrl, avatarUrl, email, userName, password) {
  // Create a user object with all the provided data
  const userData = {
    
    fullName,
    coverImage: coverImageUrl || '',
    avatar: avatarUrl,
    email,
    userName: userName.toUpperCase(),
    password,
  }; 

  // Create the user in the database
  const createdUser = await User.create(userData);

  // Retrieve the user from the database, but exclude the password and refreshToken fields
  const cleanedUser = await User.findById(createdUser._id)
    .select('-password -refreshToken');

  // If the user was not found in the database, throw an ApiError
  if (!cleanedUser) {
    throw new ApiError(500, 'Failed to create user');
  }

  // Return a new ApiResponse object with the status code 200,
  // the cleanedUser object, and the message 'User added'
  return new ApiResponse(200, cleanedUser, 'User added');
}
export{createUserData}