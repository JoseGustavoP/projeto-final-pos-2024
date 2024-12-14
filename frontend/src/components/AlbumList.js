import React, { useState, useEffect } from 'react';
import { getAlbuns, createAlbum, updateAlbum, deleteAlbum, getUsuarios } from '../api'; // Alteração aqui

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ titulo: '', usuario: '' });

  // Buscar álbuns e usuários ao carregar o componente
  useEffect(() => {
    fetchAlbums();
    fetchUsuarios();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await getAlbuns(); // Alteração aqui
      setAlbums(response.data);
    } catch (error) {
      console.error('Erro ao buscar álbuns:', error);
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
    // Validar dados antes de criar o álbum
    if (!newAlbum.titulo || !newAlbum.usuario) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      await createAlbum(newAlbum);
      fetchAlbums(); // Atualiza a lista após criação
      setNewAlbum({ titulo: '', usuario: '' }); // Limpa o formulário
    } catch (error) {
      console.error('Erro ao criar álbum:', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdate = async (id) => {
    const updatedAlbum = {
      ...newAlbum, // Envia os dados atualizados
    };
    try {
      await updateAlbum(id, updatedAlbum);
      fetchAlbums();
      setNewAlbum({ titulo: '', usuario: '' }); // Limpa o formulário após a atualização
    } catch (error) {
      console.error('Erro ao atualizar álbum:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAlbum(id);
      fetchAlbums(); // Atualiza a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar álbum:', error.response ? error.response.data : error.message);
    }
  };

  const getUsuarioNomeById = (usuarioId) => {
    const usuario = usuarios.find((user) => user.id === usuarioId);
    return usuario ? usuario.nome : 'Usuário desconhecido';
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Álbuns</h1>

      {/* Formulário para criar novo álbum */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          value={newAlbum.titulo}
          onChange={(e) => setNewAlbum({ ...newAlbum, titulo: e.target.value })}
          placeholder="Título do Álbum"
        />
        <select
          className="form-control mb-2"
          value={newAlbum.usuario}
          onChange={(e) => setNewAlbum({ ...newAlbum, usuario: e.target.value })}
        >
          <option value="">Selecione o Usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleCreate}>Criar Álbum</button>
      </div>

      {/* Lista de álbuns */}
      <ul className="list-group">
        {albums.map((album) => (
          <li key={album.id} className="list-group-item d-flex justify-content-between align-items-center">
            <strong>{album.titulo}</strong><br />
            <small>Por: {getUsuarioNomeById(album.usuario)}</small>
            <div>
              <button
                className="btn btn-warning btn-sm mx-1"
                onClick={() => handleUpdate(album.id)}
              >
                Atualizar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(album.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
