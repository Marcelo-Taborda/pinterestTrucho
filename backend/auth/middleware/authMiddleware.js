// auth/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware para verificar la autenticación del usuario
exports.authenticate = (req, res, next) => {
  try {
    // Obtener el token de la cookie
    const token = req.cookies.token;
    console.log(req.userId);

    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Añadir el ID del usuario al objeto de solicitud
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token inválido' });
  }
};
