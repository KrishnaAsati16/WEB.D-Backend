import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
})


const uploadOnClodinary = async (localFilePath) => {
    try {
          if(!localFilePath) return null
          // upload  the file on cloudinary
         const response = await cloudinary.uploader.upload
          (localFilePath,{
            resource_type : "auto"
          })
          // file has been uploaded successfull
          console.log("file is uploaded successfully on cloudinary",response.url)
          return response
    }
    catch(error) {
        fs.unlinkSync(localFilePath)  // remove the locally saved temporary file as the uploade operation got failed
        return null

    }
}


cloudinary.v2.uploader
.upload("dog.mp4", {
  resource_type: "video", 
  public_id: "my_dog",
  overwrite: true, 
  notification_url: "https://mysite.example.com/notify_endpoint"})
.then(result=>console.log(result));

export {uploadOnClodinary}