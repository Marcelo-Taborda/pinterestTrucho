import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Directorio = () => {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_AUTH}/api/auth/user`);
        setUser(response.data);
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error(error);
        setUser(null);
        setFavorites([]);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchFavoriteImages = async () => {
      try {
        if (user && user.favorites) {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/favorites`, { favoriteIds: user.favorites });
          setImages(response.data);
        }
      } catch (error) {
        console.error(error);
        setImages([]);
      }
    };
    fetchFavoriteImages();
  }, [user]);

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
          setImages(images.filter((image) => image._id !== imageId));
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

  return (
    <>
    <h1 className="container">Favoritos</h1>
    <div className="container">
      {images.length > 0 ? (
        <div className="image-container">
          {images.map((image) => (
            <div key={image._id} className="box">
              <img src={image.image.thumbnail} alt={image._id} />
              <button className={`button ${favorites.includes(image._id) ? 'favorite' : ''}`} onClick={() => handleFavoriteClick(image._id)}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay imágenes favoritas</p>
      )}
    </div>
    </>
  );
};

export default Directorio;
