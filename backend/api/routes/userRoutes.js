import express from "express";
import { addFavorite } from "../controllers/userController.js";
import Image from '../models/images.js';


const router = express.Router();

router.post('/user/:userId/favorite', addFavorite);
router.get('/user/:userId/images', async (req, res) => {
    try {
      const userId = req.params.userId;
      const images = await Image.find({ uploadBy: userId });
  
      res.json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las imágenes del usuario' });
    }
  });

export default router;