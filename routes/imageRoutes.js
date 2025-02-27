import express from "express";
import multer from "multer";
import { uploadImage, getAllImages, deleteImage } from "../controllers/imageController.js";

const router = express.Router();

// Multer Storage Setup (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("image"), uploadImage);
router.get("/images", getAllImages);
router.delete("/images/:id", deleteImage);

export default router;
