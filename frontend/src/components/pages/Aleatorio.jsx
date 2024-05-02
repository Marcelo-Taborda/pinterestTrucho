import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Crear URL de la imagen seleccionada para previsualizarla
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert('Por favor, selecciona una imagen');
      return;
    }
    if (!user) {
      alert('Por favor, inicia sesión');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    /* enviar id del usuario */
    formData.append('uploadBy', user._id);
    formData.append('tags', e.target.tags.value);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_AUTH}/api/auth/user`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Subir imagen</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
        {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '300px' }} />}
        <input type="text" name="tags" placeholder="Etiquetas" />
        <button type="submit">Subir imagen</button>
      </form>
    </div>
  );
}

export default ImageUploader;
