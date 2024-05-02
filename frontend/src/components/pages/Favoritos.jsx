import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_AUTH}/api/auth/user`, { withCredentials: true });
        setUser(response.data);

        // Obtener las imágenes del usuario
        const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/user/${response.data._id}/images`);
        setUserImages(userResponse.data);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleFavoriteClick = async (imageId) => {
    if (user) {
      try {
        // Lógica para agregar o eliminar el ID de la imagen en la base de datos del usuario autenticado
        await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/user/${user._id}/favorite`, {
          imageId: imageId,
        });

        // Actualizar el estado de las imágenes favoritas
        if (favorites.includes(imageId)) {
          setFavorites(favorites.filter((favId) => favId !== imageId));
        } else {
          setFavorites([...favorites, imageId]);
        }
      } catch (error) {
        console.error('Error al agregar o eliminar imagen de favoritos:', error);
      }
    } else {
      // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_AUTH}/api/auth/logout`);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_API}/api/${imageId}`);
      setUserImages(userImages.filter((image) => image._id !== imageId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav>
      <div className="container">
        <div className='white'>{user ? `Bienvenido, ${user.name}` : 'Inicia sesión'}</div>
        {user && <button onClick={handleLogout}>Cerrar sesión</button>}
      </div>

      {userImages.length > 0 && (
        <div>
          <h2 className="container">Tus imágenes:</h2>
          <div className="container">
            {userImages.map((image) => (
              <div key={image._id} className="box">
                <img src={image.image.thumbnail} alt={image._id} />
                <button className={`button ${favorites.includes(image._id) ? 'favorite' : ''}`} onClick={() => handleDeleteImage(image._id)}>Eliminar</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
