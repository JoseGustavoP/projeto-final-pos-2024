import React, { useState, useEffect } from 'react';
import { getPostagens, createPostagem, updatePostagem, deletePostagem, getUsuarios } from '../api'; // Importando funções da API

const PostagemList = () => {
  const [postagens, setPostagens] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newPostagem, setNewPostagem] = useState({ titulo: '', conteudo: '', usuario: '' });

  // Buscar postagens e usuários ao carregar o componente
  useEffect(() => {
    fetchPostagens();
    fetchUsuarios();
  }, []);

  const fetchPostagens = async () => {
    try {
      const response = await getPostagens();
      setPostagens(response.data);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await getUsuarios();
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleCreate = async () => {
    // Validar dados antes de criar a postagem
    if (!newPostagem.titulo || !newPostagem.conteudo || !newPostagem.usuario) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      await createPostagem(newPostagem);
      fetchPostagens(); // Atualiza a lista após criação
      setNewPostagem({ titulo: '', conteudo: '', usuario: '' }); // Limpa o formulário
    } catch (error) {
      console.error('Erro ao criar postagem:', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdate = async (id) => {
    const updatedPostagem = {
      ...newPostagem, // Envia todos os dados do formulário
    };
    try {
      await updatePostagem(id, updatedPostagem);
      fetchPostagens();
      setNewPostagem({ titulo: '', conteudo: '', usuario: '' }); // Limpa o formulário após a atualização
    } catch (error) {
      console.error('Erro ao atualizar postagem:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePostagem(id);
      fetchPostagens(); // Atualiza a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar postagem:', error.response ? error.response.data : error.message);
    }
  };

  const getUsuarioNomeById = (usuarioId) => {
    const usuario = usuarios.find((user) => user.id === usuarioId);
    return usuario ? usuario.nome : 'Usuário desconhecido';
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Postagens</h1>

      {/* Formulário para criar nova postagem */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          value={newPostagem.titulo}
          onChange={(e) => setNewPostagem({ ...newPostagem, titulo: e.target.value })}
          placeholder="Título da Postagem"
        />
        <textarea
          className="form-control mb-2"
          value={newPostagem.conteudo}
          onChange={(e) => setNewPostagem({ ...newPostagem, conteudo: e.target.value })}
          placeholder="Conteúdo da Postagem"
        />
        <select
          className="form-control mb-2"
          value={newPostagem.usuario}
          onChange={(e) => setNewPostagem({ ...newPostagem, usuario: e.target.value })}
        >
          <option value="">Selecione o Usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleCreate}>Criar Postagem</button>
      </div>

      {/* Lista de postagens */}
      <ul className="list-group">
        {postagens.map((postagem) => (
          <li key={postagem.id} className="list-group-item d-flex justify-content-between align-items-center">
            <strong>{postagem.titulo}</strong><br />
            <em>{postagem.conteudo}</em><br />
            <small>Por: {getUsuarioNomeById(postagem.usuario)}</small>
            <div>
              <button
                className="btn btn-warning btn-sm mx-1"
                onClick={() => handleUpdate(postagem.id)}
              >
                Atualizar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(postagem.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostagemList;
