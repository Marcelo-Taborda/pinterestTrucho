import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getImage } from '../../hooks/api';

const Images = () => {
    /* capturar :id enviado por el link */
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getImage(id)
            .then((data) => {
                setImage(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (!image) {
        return (
            <div>
                <h1>Imagen no encontrada</h1>
                <button onClick={() => navigate('/')}>Volver al inicio</button>
            </div>
        );
    }

  return (
    <div>
        <h1>Images</h1>
        
        <div className='imageOriginal'>
            <img src={image.image.original} />
        </div>
        <div>
            {/* mostrar datos de un array */}
            <h2>Tags</h2>
            <ul>
                {image.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
        </div>
    </div>

  )
}

export default Images