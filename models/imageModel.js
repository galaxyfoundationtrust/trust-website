import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
});

export const Image = mongoose.model("Image", imageSchema);

