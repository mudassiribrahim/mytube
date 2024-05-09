import { User } from "../schema/users"

const loggedOutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id, {
            $set: {
                refreshToken: undefined,
            },
    },{
        new: true
    }
)
const cookiesOption = {
    httpOnly: true,
    secure: true,
}
return res
    .status(200)
    .clearCookie('refreshToken', cookiesOption)
    .clearCookie('accessToken', cookiesOption)
    .json(new ApiResponse(200, {}, 'user logged out successfully'));
})

export { loggedOutUser }