import React, { useEffect, useState } from 'react';
import { getPostagens } from '../api';
import { Link } from 'react-router-dom';

const PostagemList = () => {
  const [postagens, setPostagens] = useState([]);

  useEffect(() => {
    getPostagens().then((response) => setPostagens(response.data));
  }, []);

  return (
    <div>
      <h2>Lista de Postagens</h2>
      <ul>
        {postagens.map((postagem) => (
          <li key={postagem.id}>
            <h3>{postagem.titulo}</h3>
            <p>{postagem.conteudo}</p>
            <Link to={`/postagens/editar/${postagem.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostagemList;
