import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"; // Import from v3
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

// Configure multer storage
const storage = multer.memoryStorage(); 
export const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Example: Limit file size to 10 MB
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png"];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error("Only JPEG, and PNG images are allowed"), false);
        }
        cb(null, true);
    },
}).array("images", 3); 

// Create S3 client for SDK v3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

/**
 * Uploads an image file to S3 and returns its URL.
 * @param {Object} file - The image file object (e.g., from Multer).
 * @returns {Promise<string>} - The URL of the uploaded image.
 */
export const uploadImageToS3 = async (file) => {
    const fileKey = `${uuidv4()}-${file.originalname}`;

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
       
    };

    try {
        const command = new PutObjectCommand(params); // Create a new PutObjectCommand
        const data = await s3.send(command); // Use the send method to upload the file
        return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    } catch (err) {
        console.error("Error uploading to S3:", err);
        throw new Error("Failed to upload image to S3");
    }
};

/**
 * Deletes an image from S3 using its URL.
 * @param {string} imageUrl - The full URL of the image to delete.
 * @returns {Promise<void>}
 */
export const deleteImageFromS3 = async (imageUrl) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: imageUrl.split(".com/")[1], // Extract the S3 key from the URL
    };

    try {
        const command = new DeleteObjectCommand(params); // Create a new DeleteObjectCommand
        await s3.send(command); // Use the send method to delete the image
    } catch (err) {
        console.error("Error deleting from S3:", err);
        throw new Error("Failed to delete image from S3");
    }
};

    