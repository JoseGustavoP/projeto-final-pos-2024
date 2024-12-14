import React, { useEffect, useState } from 'react';
import { getAlbuns } from '../api';
import { Link } from 'react-router-dom';

const AlbumList = () => {
  const [albuns, setAlbuns] = useState([]);

  useEffect(() => {
    getAlbuns().then((response) => setAlbuns(response.data));
  }, []);

  return (
    <div>
      <h2>Lista de Álbuns</h2>
      <ul>
        {albuns.map((album) => (
          <li key={album.id}>
            <h3>{album.titulo}</h3>
            <Link to={`/albuns/editar/${album.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
