import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINAR_CLOUD_NAME,
    api_key: process.env.CLOUDINAR_API_KEY,
    api_secret: process.env.CLOUDINAR_API_SECRET,
});

const uploadAtCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
        });
        fs.unlinkSync(filePath)
        return response;
    } catch (error) {
        fs.unlinkSync(filePath);
        return null;
    }
};

export { uploadAtCloudinary };
