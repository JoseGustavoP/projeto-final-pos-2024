import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', nome_usuario: '' });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const response = await api.get('/usuarios/');
    setUsuarios(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario({ ...novoUsuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/usuarios/', novoUsuario);
    fetchUsuarios();
  };

  return (
    <div>
      <h1>Usuários</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
        <input type="text" name="nome_usuario" placeholder="Nome de Usuário" onChange={handleInputChange} />
        <button type="submit">Adicionar Usuário</button>
      </form>

      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
