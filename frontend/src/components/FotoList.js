import React, { useEffect, useState } from 'react';
import { getFotos } from '../api';
import { Link } from 'react-router-dom';

const FotoList = () => {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    getFotos().then((response) => setFotos(response.data));
  }, []);

  return (
    <div>
      <h2>Lista de Fotos</h2>
      <ul>
        {fotos.map((foto) => (
          <li key={foto.id}>
            <h3>{foto.titulo}</h3>
            <img src={foto.url_miniatura} alt={foto.titulo} />
            <Link to={`/fotos/editar/${foto.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FotoList;
