import React, { useEffect, useState } from 'react';
import { getFotos } from '../api';
import { Link } from 'react-router-dom';

const FotoList = () => {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    getFotos().then((response) => setFotos(response.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Fotos</h2>
      <div className="row">
        {fotos.map((foto) => (
          <div key={foto.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={foto.url_miniatura} alt={foto.titulo} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{foto.titulo}</h5>
                <Link to={`/fotos/editar/${foto.id}`} className="btn btn-primary">
                  Editar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FotoList;
