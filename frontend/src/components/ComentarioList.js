import React, { useEffect, useState } from 'react';
import { getComentarios } from '../api';
import { Link } from 'react-router-dom';

const ComentarioList = () => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    getComentarios().then((response) => setComentarios(response.data));
  }, []);

  return (
    <div>
      <h2>Lista de Comentários</h2>
      <ul>
        {comentarios.map((comentario) => (
          <li key={comentario.id}>
            <h3>{comentario.nome}</h3>
            <p>{comentario.conteudo}</p>
            <Link to={`/comentarios/editar/${comentario.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComentarioList;
