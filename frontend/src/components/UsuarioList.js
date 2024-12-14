import React, { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../api';

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [newUsuario, setNewUsuario] = useState({ nome: '', email: '', nome_usuario: '' });

  // Buscar usuários ao carregar o componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await getUsuarios();
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleCreate = async () => {
    // Validar dados antes de criar o usuário
    if (!newUsuario.nome || !newUsuario.email || !newUsuario.nome_usuario) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      await createUsuario(newUsuario);
      fetchUsuarios(); // Atualiza a lista após criação
      setNewUsuario({ nome: '', email: '', nome_usuario: '' }); // Limpa o formulário
    } catch (error) {
      console.error('Erro ao criar usuário:', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdate = async (id) => {
    // Validar dados antes de atualizar o usuário
    if (!newUsuario.nome || !newUsuario.email || !newUsuario.nome_usuario) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      const updatedUsuario = { ...newUsuario }; // Garantir que estamos enviando os dados corretos
      await updateUsuario(id, updatedUsuario);
      fetchUsuarios();
      setNewUsuario({ nome: '', email: '', nome_usuario: '' }); // Limpa o formulário após a atualização
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      fetchUsuarios(); // Atualiza a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar usuário:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Usuários</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          value={newUsuario.nome}
          onChange={(e) => setNewUsuario({ ...newUsuario, nome: e.target.value })}
          placeholder="Nome"
        />
        <input
          type="email"
          className="form-control mb-2"
          value={newUsuario.email}
          onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="text"
          className="form-control mb-2"
          value={newUsuario.nome_usuario}
          onChange={(e) => setNewUsuario({ ...newUsuario, nome_usuario: e.target.value })}
          placeholder="Nome de usuário"
        />
        <button className="btn btn-primary" onClick={handleCreate}>Criar Usuário</button>
      </div>

      <ul className="list-group">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center">
            {usuario.nome} ({usuario.email}) - {usuario.nome_usuario}
            <div>
              <button className="btn btn-warning btn-sm mx-1" onClick={() => handleUpdate(usuario.id)}>Atualizar</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(usuario.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuarioList;
