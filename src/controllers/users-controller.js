import asyncHandler from '../utils/asyncHandler.js';

const userRegister = asyncHandler(async (req, res) => {
   const {fullName, email, password, userName} = req.body; 

    
});

export { userRegister };
