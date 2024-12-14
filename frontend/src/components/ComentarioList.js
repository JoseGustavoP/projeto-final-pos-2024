import React, { useEffect, useState } from 'react';
import { getComentarios } from '../api';
import { Link } from 'react-router-dom';

const ComentarioList = () => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    getComentarios().then((response) => setComentarios(response.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Comentários</h2>
      <div className="list-group">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="list-group-item">
            <h5 className="mb-1">{comentario.nome}</h5>
            <p className="mb-1">{comentario.conteudo}</p>
            <Link to={`/comentarios/editar/${comentario.id}`} className="btn btn-sm btn-primary">
              Editar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComentarioList;
