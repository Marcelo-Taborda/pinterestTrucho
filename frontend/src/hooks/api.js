/* images de la api ${import.meta.env.VITE_BACKEND_API}/api */
import axios from 'axios';

const url = `${import.meta.env.VITE_BACKEND_API}/api`;

export const getImages = async () => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getFavoriteImages = async (favoriteIds) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/images/favorites`, {
      favoriteIds: favoriteIds,
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving favorite images:', error);
    throw error;
  }
};

export const getImage = async (imageId) => {
    try {
        const { data } = await axios.get(`${url}/${imageId}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}