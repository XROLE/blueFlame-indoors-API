import cloudinary from 'cloudinary';

/**
 * Upload images to cloudinary and returns uploaded image object
 * @param {File} image - Image file to be uploaded
 *
 * @returns {object} - Uploaded image object from cloudinary
 */
const uploadToCloudinary = async (image) => {
  const result = await cloudinary.v2.uploader.upload(image);
  return result;
};

export default uploadToCloudinary;
