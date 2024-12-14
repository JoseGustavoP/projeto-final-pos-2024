import React, { useState, useEffect } from 'react';
import { getFotos, createFoto, updateFoto, deleteFoto, getAlbuns } from '../api'; // Funções de API

const FotoList = () => {
  const [fotos, setFotos] = useState([]);
  const [albuns, setAlbuns] = useState([]);
  const [newFoto, setNewFoto] = useState({ titulo: '', album: '', url: '', url_miniatura: '' });

  // Buscar fotos e álbuns ao carregar o componente
  useEffect(() => {
    fetchFotos();
    fetchAlbuns();
  }, []);

  const fetchFotos = async () => {
    try {
      const response = await getFotos();
      setFotos(response.data);
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
    }
  };

  const fetchAlbuns = async () => {
    try {
      const response = await getAlbuns();
      setAlbuns(response.data);
    } catch (error) {
      console.error('Erro ao buscar álbuns:', error);
    }
  };

  const handleCreate = async () => {
    // Validar dados antes de criar a foto
    if (!newFoto.titulo || !newFoto.album || !newFoto.url || !newFoto.url_miniatura) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      await createFoto(newFoto);
      fetchFotos(); // Atualiza a lista após criação
      setNewFoto({ titulo: '', album: '', url: '', url_miniatura: '' }); // Limpa o formulário
    } catch (error) {
      console.error('Erro ao criar foto:', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdate = async (id) => {
    const updatedFoto = { ...newFoto };
    try {
      await updateFoto(id, updatedFoto);
      fetchFotos();
      setNewFoto({ titulo: '', album: '', url: '', url_miniatura: '' }); // Limpa o formulário após atualização
    } catch (error) {
      console.error('Erro ao atualizar foto:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFoto(id);
      fetchFotos(); // Atualiza a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar foto:', error.response ? error.response.data : error.message);
    }
  };

  const getAlbumTituloById = (albumId) => {
    const album = albuns.find((alb) => alb.id === albumId);
    return album ? album.titulo : 'Álbum desconhecido';
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Fotos</h1>

      {/* Formulário para criar nova foto */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          value={newFoto.titulo}
          onChange={(e) => setNewFoto({ ...newFoto, titulo: e.target.value })}
          placeholder="Título da Foto"
        />
        <select
          className="form-control mb-2"
          value={newFoto.album}
          onChange={(e) => setNewFoto({ ...newFoto, album: e.target.value })}
        >
          <option value="">Selecione o Álbum</option>
          {albuns.map((album) => (
            <option key={album.id} value={album.id}>
              {album.titulo}
            </option>
          ))}
        </select>
        <input
          type="url"
          className="form-control mb-2"
          value={newFoto.url}
          onChange={(e) => setNewFoto({ ...newFoto, url: e.target.value })}
          placeholder="URL da Foto"
        />
        <input
          type="url"
          className="form-control mb-2"
          value={newFoto.url_miniatura}
          onChange={(e) => setNewFoto({ ...newFoto, url_miniatura: e.target.value })}
          placeholder="URL da Miniatura"
        />
        <button className="btn btn-primary" onClick={handleCreate}>Criar Foto</button>
      </div>

      {/* Lista de fotos */}
      <ul className="list-group">
        {fotos.map((foto) => (
          <li key={foto.id} className="list-group-item d-flex justify-content-between align-items-center">
            <strong>{foto.titulo}</strong><br />
            <small>Álbum: {getAlbumTituloById(foto.album)}</small>

            {/* Exibindo a imagem */}
            <div className="mt-2">
              <img
                src={foto.url_miniatura}
                alt={foto.titulo}
                style={{ width: '100px', height: 'auto', marginRight: '10px' }}
              />
              <a href={foto.url} target="_blank" rel="noopener noreferrer">Ver imagem completa</a>
            </div>

            <div>
              <button
                className="btn btn-warning btn-sm mx-1"
                onClick={() => handleUpdate(foto.id)}
              >
                Atualizar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(foto.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FotoList;
