import React, { useState, useEffect } from 'react';
import { getImages } from '../../hooks/api';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    setIsLoading(true);
    getImages()
      .then((data) => {
        // Mezclar los elementos de data de forma aleatoria
        const shuffledData = /* shuffleArray */reverseArray(data);
        setData(shuffledData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_AUTH}/api/auth/user`);
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

  // Función para mezclar los elementos de un array de forma aleatoria
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
    /* return array.sort(() => Math.random() - 0.5); */
  };
  const reverseArray = (array) => {
    const reversedArray = [...array];
    return reversedArray.reverse();
    };


  return (
    <main>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {data && (
        <div className="container">
          {data.map((image) => (
            <div key={image._id} className="box">
              <Link to={`/images/${image._id}`} className="overlay">
                <img
                  src={image.image.thumbnail}
                  alt={image.image}
                  className={favorites.includes(image._id) ? 'favorite' : ''}
                />
              </Link>
              <button
                className={`button ${favorites.includes(image._id) ? 'favorite' : ''}`}
                onClick={() => handleFavoriteClick(image._id)}
              >
                FAV
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
