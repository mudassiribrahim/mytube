import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINAR_CLOUD_NAME,
    api_key: process.env.CLOUDINAR_API_KEY,
    api_secret: process.env.CLOUDINAR_API_SECRET,
});

/* 
    This function uploads a file to Cloudinary. 
    
    Parameters:
        filePath (string): The path to the file to be uploaded.
    
    Returns:
        If the upload is successful, the response from Cloudinary is returned.
        If the upload fails, null is returned and the local file is deleted.

    Steps:
        1. Check if the filePath is provided. If not, return null.
        2. Try to upload the file to Cloudinary using the provided filePath.
            - The resource_type is set to 'auto' to automatically determine if the file is an image or video.
        3. If the upload is successful, delete the local file and return the Cloudinary response.
        4. If the upload fails, delete the local file and return null.
*/
const uploadAtCloudinary = async (filePath) => {
    try {
        // Check if the filePath is provided. If not, return null.
        if (!filePath) return null;

        // Try to upload the file to Cloudinary using the provided filePath.
        // The resource_type is set to 'auto' to automatically determine if the file is an image or video.
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
        });

        // If the upload is successful, delete the local file and return the Cloudinary response.
        fs.unlinkSync(filePath);
        return response;
    } catch (error) {
        // If the upload fails, delete the local file and return null.
        fs.unlinkSync(filePath);
        return null;
    }
};

export { uploadAtCloudinary };
