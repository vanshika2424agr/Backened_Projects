import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const {fullName,email,username,password} = req.body;
  console.log(email);

  if(
    [fullName,email,username,password].some((field) => 
      field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  User.findOne({
    $or: [{ email }, { username }],
  })
    if (existingUser) {
      throw new ApiError(400, "Email or username already exists");
    }

    const avatarPath=req.files?.avatar[0]?.path;
    const coverImagePath=req.files?.coverImage[0]?.path;

    if(!avatarPath || !coverImagePath) {
      throw new ApiError(400, "Avatar and cover image are required");
    }

    const avatar=await  uploadOnCloudinary(avatarPath, "avatars")
    const coverImage=await uploadOnCloudinary(coverImagePath, "coverImages")

    if(!avatar) {
      throw new ApiError(500, "Failed to upload images");
    }

    const user=await User.create({
      fullName,
      avatar:avatar.secure_url,
      coverImage:coverImage?.secure_url || "",
      email,
      username:username.toLowerCase(),
      password,
    })

    const createdUser=await User.findById(user._id).select("-password -refreshToken");

if(!createdUser) {
  throw new ApiError(500, "Failed to create user");
} 

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});
export { registerUser };


/*“This code defines an async API controller that sends a response and safely handles errors using asyncHandler.”*/

