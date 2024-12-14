import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../api';
import { Link } from 'react-router-dom';

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios().then((response) => setUsuarios(response.data));
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <h3>{usuario.nome}</h3>
            <p>{usuario.email}</p>
            <p>{usuario.nome_usuario}</p>
            <Link to={`/usuarios/editar/${usuario.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuarioList;
