import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullName, password } = req.body; // Collect the request from the server 
    if([username, email, fullName, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "This fields are required") // Check Value is null here
    } 
    const userExists = User.findOne({
        $or: [{email, username}] // Check the validation already exists in database
    })
    if(userExists) {
        throw new ApiError(400, "User already exits");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullName,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    });

    const result = User.findById(user._id).select("-password -refreshToken");
    if(!result) {
        throw new ApiError(500, "Something went wrong while registing a user");
    }

    return res.status(201).json(new ApiResponse(200, result, "Success"))
});

const getUserDetails = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: 'ok '
    });
})

export { registerUser, getUserDetails }