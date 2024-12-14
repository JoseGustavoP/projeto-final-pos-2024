import React, { useEffect, useState } from 'react';
import { getPostagens } from '../api';
import { Link } from 'react-router-dom';

const PostagemList = () => {
  const [postagens, setPostagens] = useState([]);

  useEffect(() => {
    getPostagens().then((response) => setPostagens(response.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Postagens</h2>
      <div className="list-group">
        {postagens.map((postagem) => (
          <div key={postagem.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h3>{postagem.titulo}</h3>
              <p>{postagem.conteudo}</p>
            </div>
            <Link to={`/postagens/editar/${postagem.id}`} className="btn btn-primary">
              Editar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostagemList;
