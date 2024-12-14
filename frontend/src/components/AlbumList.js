import React, { useEffect, useState } from 'react';
import { getAlbuns } from '../api';
import { Link } from 'react-router-dom';

const AlbumList = () => {
  const [albuns, setAlbuns] = useState([]);

  useEffect(() => {
    getAlbuns().then((response) => setAlbuns(response.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Álbuns</h2>
      <div className="list-group">
        {albuns.map((album) => (
          <div key={album.id} className="list-group-item">
            <h5 className="mb-1">{album.titulo}</h5>
            <Link to={`/albuns/editar/${album.id}`} className="btn btn-sm btn-primary">
              Editar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
