// auth/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel');

// Ruta para el registro de usuarios
router.post('/register', authController.register);

// Ruta para el inicio de sesión
router.post('/login', authController.login);

// Ruta para cerrar sesión
router.post('/logout', authMiddleware.authenticate, authController.logout);

/*  */
// Ruta para obtener la información del usuario actual
router.get('/user', authMiddleware.authenticate, async (req, res) => {
    try {
      // Obtener el ID del usuario desde el middleware de autenticación
      const userId = req.userId;
  
      // Buscar el usuario en la base de datos
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Devolver la información del usuario
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
/*  */

module.exports = router;
