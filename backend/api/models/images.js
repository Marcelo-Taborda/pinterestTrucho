import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    image: { 
        original: { type: String, required: true },
        thumbnail: { type: String, required: true },
     },
    tags: { type: Array, required: true },
    favorites: { type: Number, required: true },
    uploadBy: { type: String, required: true },
}, { timestamps: true }
);

export default mongoose.model('Image', ImageSchema);