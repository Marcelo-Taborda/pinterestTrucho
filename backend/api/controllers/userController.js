import User from '../models/userModel.js';

export const addFavorite = async (req, res) => {
    const userId = req.params.userId;
    const imageId = req.body.imageId;
  
    try {
      // Buscar al usuario por su ID en la base de datos
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Verificar si la imagen ya está en favoritos del usuario
      if (user.favorites.includes(imageId)) {
        /* eliminar de favoritos */
        // Obtener el índice de la imagen en el array de favoritos
        const index = user.favorites.indexOf(imageId);

        // Eliminar la imagen del array de favoritos
        user.favorites.splice(index, 1);
        await user.save();

        return res.json({ success: true });
      }
  
      // Agregar el ID de la imagen a favoritos del usuario
      user.favorites.push(imageId);
      await user.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error adding image to favorites:', error);
      res.status(500).json({ message: 'Error adding image to favorites' });
    }
};