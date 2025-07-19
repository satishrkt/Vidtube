import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (loaclFilePath) => {
    try{
        if(!loaclFilePath) return null;

        const response = await cloudinary.uploader.upload(loaclFilePath, {
            resource_type: 'auto'
        });

        console.log("File is uploaded on cloudinary", response.url);
        return response;
    } catch(error) {
        console.log("file error");
        fs.unlinkSync(loaclFilePath); //remove the locally saved temporary file as the upload file opertaion got failed
        return null;
    }
}

export { uploadOnCloudinary }






// Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    
    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl); 