import React, { useState, useEffect } from 'react';
import { getComentarios, createComentario, updateComentario, deleteComentario, getPostagens } from '../api'; // Funções de API

const ComentarioList = () => {
  const [comentarios, setComentarios] = useState([]);
  const [postagens, setPostagens] = useState([]);
  const [newComentario, setNewComentario] = useState({ nome: '', email: '', conteudo: '', postagem: '' });

  // Buscar comentários e postagens ao carregar o componente
  useEffect(() => {
    fetchComentarios();
    fetchPostagens();
  }, []);

  const fetchComentarios = async () => {
    try {
      const response = await getComentarios();
      setComentarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  const fetchPostagens = async () => {
    try {
      const response = await getPostagens();
      setPostagens(response.data);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
    }
  };

  const handleCreate = async () => {
    // Validar dados antes de criar o comentário
    if (!newComentario.nome || !newComentario.email || !newComentario.conteudo || !newComentario.postagem) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      await createComentario(newComentario);
      fetchComentarios(); // Atualiza a lista após criação
      setNewComentario({ nome: '', email: '', conteudo: '', postagem: '' }); // Limpa o formulário
    } catch (error) {
      console.error('Erro ao criar comentário:', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdate = async (id) => {
    const updatedComentario = { ...newComentario };
    try {
      await updateComentario(id, updatedComentario);
      fetchComentarios();
      setNewComentario({ nome: '', email: '', conteudo: '', postagem: '' }); // Limpa o formulário após atualização
    } catch (error) {
      console.error('Erro ao atualizar comentário:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComentario(id);
      fetchComentarios(); // Atualiza a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar comentário:', error.response ? error.response.data : error.message);
    }
  };

  const getPostagemTituloById = (postagemId) => {
    const postagem = postagens.find((pst) => pst.id === postagemId);
    return postagem ? postagem.titulo : 'Postagem desconhecida';
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Comentários</h1>

      {/* Formulário para criar novo comentário */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          value={newComentario.nome}
          onChange={(e) => setNewComentario({ ...newComentario, nome: e.target.value })}
          placeholder="Seu nome"
        />
        <input
          type="email"
          className="form-control mb-2"
          value={newComentario.email}
          onChange={(e) => setNewComentario({ ...newComentario, email: e.target.value })}
          placeholder="Seu email"
        />
        <select
          className="form-control mb-2"
          value={newComentario.postagem}
          onChange={(e) => setNewComentario({ ...newComentario, postagem: e.target.value })}
        >
          <option value="">Selecione a Postagem</option>
          {postagens.map((postagem) => (
            <option key={postagem.id} value={postagem.id}>
              {postagem.titulo}
            </option>
          ))}
        </select>
        <textarea
          className="form-control mb-2"
          value={newComentario.conteudo}
          onChange={(e) => setNewComentario({ ...newComentario, conteudo: e.target.value })}
          placeholder="Conteúdo do comentário"
        />
        <button className="btn btn-primary" onClick={handleCreate}>Criar Comentário</button>
      </div>

      {/* Lista de comentários */}
      <ul className="list-group">
        {comentarios.map((comentario) => (
          <li key={comentario.id} className="list-group-item d-flex justify-content-between align-items-center">
            <strong>{comentario.nome}</strong><br />
            <small>{comentario.email}</small><br />
            <small>Postagem: {getPostagemTituloById(comentario.postagem)}</small><br />
            <p>{comentario.conteudo}</p>

            <div>
              <button
                className="btn btn-warning btn-sm mx-1"
                onClick={() => handleUpdate(comentario.id)}
              >
                Atualizar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(comentario.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComentarioList;
