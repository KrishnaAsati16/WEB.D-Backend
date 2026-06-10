// import moongoose from "moongoose";
import {asyncHandler} from "../utils/asyncHanddler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js"         // db se direct contact kar sakta h
import {uploadOnClodinary, UploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccesAndRefreshTokens = async(userId) =>{
    try{
       const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
                
        user.refreshToken = refreshToken
       await user.save({validateBeforeSave: false})

       return {accessToken,refreshToken}


    }catch(error){
               throw new ApiError(500,"something wents wrong")
    }
} 
 
const registerUser = asyncHandler( async (req,res) =>{
    //  return res.status(200).json({
    //     message : "ok"
    // })
                 
    

    // register controller ->

     // get user details from frontend 
     // validation - not empty
     // check if user already exist 
     // check for img , check for avatar
     // upload them to cloudinary,avatar
     // create user object -> create entry in db
     // remove password and refresh toekn field from response
     // check for user creation
     // return res
                
            // uper wale sare points follow karke code karo ------------

       const{fullName,email,username,password}= req.body
       console.log("email:",email)

    //    if(fullName === ""){
    //     throw new ApiError(400, "fullName is required")
    //    }
             
    if(
        [fullName,email,username,password].some((field)=>
        field?.trim()==="")
    ){
            throw new ApiError(400,"all fields are required")
    }

   const exitedUser= User.findOne({
        $or: [{username},{email}]
    })

    if(exitedUser){
        throw new ApiError(409,"user with email or username already exist")
    }

     const avatarLocalPath = req.files?.avatar[0].path
     const coverImageLocalPath= req.files?.coverImage[0]?.
     path;

     if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
     }

       const avatar= await uploadOnClodinary(avatarLocalPath)
    const coverImage = await uploadOnClodinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"all fields are required")
    }

   const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const CreatedUser = await User.findById(user._id).select(
        "-password -refreshToken "
    )
    if(!createdUser){
        throw new ApiError(500,"something went wrong while regisering the user")   
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User register successfully")
    )             
})

const loginUser = asyncHandler(async(req,res) =>{
          // req body se data le aao
          // username or email
          // find the user 
          // password check
          // access and req token 
          // send them in cookies

        //    apply krte h ------->

        const {email,username,password} = req.body

        if(!usermae || !email){
            throw new ApiError(400, " username or password requird")
        }

       const user= await User.findOne({
            $or:[{username},{email}]
        })

        if(!user){
            throw new ApiError(404,"User does not exist")
        }

       const isPasswordValid= await user.isPasswordCorrect(password)
                 
        if(!isPasswordValid){
            throw new ApiError(401,"Password incorrect")
        }

       const{accessToken,refreshToken} = await generateAccesAndRefreshTokens(user._id)

      const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
        const options = {
            httpOnly: true,
            secure:true
        }

        return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(new ApiResponse(200,{
            user:loggedInUser,accessToken,refreshToken
        },
        "User Logged in Successfully"
    )
)

})

const logoutUser = asyncHandler(async(req,res) =>{
     await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
              new:true
        }
     )
      const options = {
            httpOnly: true,
            secure:true
        }

        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200,{},"User logged Out"))
})

    // ACCESS TOKEN AND REFRESH TOKEN IN BACKEND ------>

const refreshAccessToken = asyncHandler(async(req,res)=>{
     const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

     if(!incomingRefreshToken){
        throw new ApiError(401,"unauthorized request")
     }

    try {
          const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
         )
    
        const user =  User.findById(decodedToken?._id)
    
         if(!user){
            throw new ApiError(401,"invalid request token")
         }
    
         if(incomingRefreshToken !==user?.refreshAccessToken ){
            throw new ApiError(401, "refresh token is expired or used")
         }
    
            const options = {
                httpOnly:true,
                secure: true
            }
    
            const{accessToken,newRefreshToken} =await generateAccesAndRefreshTokens(user._id)
    
            return res
            .status(200)
            .cookie("access",accessToken,options)
            .cookies("refreshToken",newRefreshToken,options)
            .json(
                new ApiResponse(
                    200,
                  {accessToken, refreshToken: newRefreshToken},
                  "Access token refreshed successfully"
                )
            )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Refresh token")
    }


})
                          
            // Writing update controllers for user ------->

     const changeCurrentPassword = asyncHandler(async(req,res)=>{
        const {oldPassword,newPassword} = req.body

        // if((new password === confPassword)){
        //     throw new Api
        // }

     const user = await User.findById(req.user?._id)
     const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

     if(!isPasswordCorrect){
        throw new ApiError(400,"invalid old password")
     }

     user.password = newPassword 
      await user.save({validateBeforeSave:false})
      
      return res.status(200).json(new ApiResponse(200,{},"Password changed successfully"))


    })  
    
    
    const getCurrentUser = asyncHandler(async(req,res)=>{
        return res
        .status(200)
        .json(200,req.user,"current user fetched successfully")
    })

    const updateAccountDetails = asyncHandler(async(req,res)=>{
        const {fullName, email} =req.body

        if(!fullName || !email){
            throw new ApiError(400,"All fields are required")
        }

        User.findByIdAndUpdate(
            req.user?._id,
            {
                $set:{
                    fullName:fullName,
                    email:email
                }
            },
            {new:true}
        ).select("-password")

        return res.status(200).json(new ApiResponse(200,user,"Account details updated successfully"))
    })

    const updateUserAvatar = asyncHandler(async(req,res)=>{
        const avatarLocalPath = req.file?.path
        if(!avatarLocalPath){
            throw new ApiError(400,"Avatar file is missing")
        }

         const avatar =await uploadOnClodinary(avatarLocalPath)

         if(!avatar.url){
            throw new ApiError(400," rror while uploading on avatar")
         }

          const user =await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set:{
                    avatar: avatar.url
                }
            },
            {new:true}
         ).select("-password")
          return res.status(200).json(ApiResponse(400,user,"Avatar updated successfully"))
    })

      const updateUserCoverImage = asyncHandler(async(req,res)=>{
        const coverImageLocalPath = req.file?.path
        if(!coverImageLocalPath){
            throw new ApiError(400,"CoverImage file is missing")
        }

         const CoverImage =await uploadOnClodinary(coverImageLocalPath)

         if(!coverImage.url){
            throw new ApiError(400,"Error while uploading on coverImage")
         }

        const user =  await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set:{
                    coverImage:coverImage.url
                }
            },
            {new:true}
         ).select("-password")

         return res.status(200).json( new ApiResponse(400,user,"Coverimage updated successfully"))
    })

export {registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage

}