import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE,
});

/**
 * Upload images to cloudinary and returns uploaded image object
 * @param {File} image - Image file to be uploaded
 *
 * @returns {object} - Uploaded image object from cloudinary
 */
const uploadToCloudinary = (image) => {
  try {
    return cloudinary.v2.uploader.upload(image, (err, result) => {
    });
  } catch (error) {
    console.log(error);
  }
};

export default uploadToCloudinary;
