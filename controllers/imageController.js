import { Image } from "../models/imageModel.js";
import cloudinary from "../config/cloudinary.js";

// Upload Image Controller
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file to Cloudinary
    cloudinary.uploader.upload_stream({ folder: "mern_images" }, async (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Cloudinary upload failed" });
      }

      // Save image URL in MongoDB
      const newImage = new Image({ imageUrl: result.secure_url });
      await newImage.save();

      res.status(200).json({ message: "Image uploaded successfully", url: result.secure_url });
    }).end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Images Controller
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Image Controller
export const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    // Find the image in the database
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // If you've stored Cloudinary's public_id when uploading, delete from Cloudinary first.
    // For example, if you stored it as image.publicId:
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    // Delete image document from MongoDB
    await Image.findByIdAndDelete(imageId);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
