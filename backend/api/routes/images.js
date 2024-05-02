import express from "express";
import multer from "multer";
import { createImage, getImages } from "../controllers/images.js";
import { nanoid } from 'nanoid';
import Image from '../models/images.js';

const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes subidas
  },
  filename: async function (req, file, cb) {
    const uniqueKey = async () => {
      const id = nanoid(8);
      const key = await Image.findOne({ key: id });
      if (key) {
        return uniqueKey();
      }
      return id;
    };

    const filename = `${await uniqueKey()}.${file.originalname.split('.').pop()}`;
    cb(null, filename); // Nombre de archivo único
  }
});

const upload = multer({ storage: storage });

// Rutas
router.get("/", getImmages);
router.post("/", createImage);
router.post("/upload", upload.single("image"), createImage);

router.post('/favorites', async (req, res) => {
    try {
      const { favoriteIds } = req.body;
  
      // Buscar las imágenes favoritas por sus IDs en la base de datos
      const images = await Image.find({ _id: { $in: favoriteIds } });
        
      res.json(images);
    } catch (error) {
      console.error('Error fetching favorite images:', error);
      res.status(500).json({ message: 'Error fetching favorite images' });
    }
  });

  router.delete('/:imageId', async (req, res) => {
    try {
      const imageId = req.params.imageId;
      await Image.findByIdAndDelete(imageId);
  
      res.json({ message: 'Imagen eliminada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la imagen' });
    }
  });
  
  /* obtener una sola imagen con el id */
  router.get('/:imageId', async (req, res) => {
    try {
      const imageId = req.params.imageId;
      const image = await Image.findById(imageId);

      res.json(image);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la imagen' });
    }
  });

export default router;