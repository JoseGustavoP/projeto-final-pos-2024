import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../api';
import { Link } from 'react-router-dom';

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios().then((response) => setUsuarios(response.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Usuários</h2>
      <div className="list-group">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="list-group-item">
            <h3>{usuario.nome}</h3>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Nome de Usuário:</strong> {usuario.nome_usuario}</p>
            <Link to={`/usuarios/editar/${usuario.id}`} className="btn btn-primary">
              Editar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsuarioList;
