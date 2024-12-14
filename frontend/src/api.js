// src/api.js
import axios from 'axios';

// Base URL da sua API Django (substitua pelo endereço correto)
const API_URL = 'http://127.0.0.1:8000/';

// Criando uma instância do Axios para facilitar o uso
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funções de CRUD para cada modelo

// USUÁRIOS
export const getUsuarios = () => api.get('usuarios/');
export const getUsuario = (id) => api.get(`usuarios/${id}/`);
export const createUsuario = (usuario) => api.post('usuarios/', usuario);
export const updateUsuario = (id, usuario) => api.put(`usuarios/${id}/`, usuario);
export const deleteUsuario = (id) => api.delete(`usuarios/${id}/`);

// TAREFAS
export const getTarefas = () => api.get('tarefas/');
export const getTarefa = (id) => api.get(`tarefas/${id}/`);
export const createTarefa = (tarefa) => api.post('tarefas/', tarefa);
export const updateTarefa = (id, tarefa) => api.put(`tarefas/${id}/`, tarefa);
export const deleteTarefa = (id) => api.delete(`tarefas/${id}/`);

// POSTAGENS
export const getPostagens = () => api.get('postagens/');
export const getPostagem = (id) => api.get(`postagens/${id}/`);
export const createPostagem = (postagem) => api.post('postagens/', postagem);
export const updatePostagem = (id, postagem) => api.put(`postagens/${id}/`, postagem);
export const deletePostagem = (id) => api.delete(`postagens/${id}/`);

// COMENTÁRIOS
export const getComentarios = () => api.get('comentarios/');
export const getComentario = (id) => api.get(`comentarios/${id}/`);
export const createComentario = (comentario) => api.post('comentarios/', comentario);
export const updateComentario = (id, comentario) => api.put(`comentarios/${id}/`, comentario);
export const deleteComentario = (id) => api.delete(`comentarios/${id}/`);

// ALBUNS
export const getAlbuns = () => api.get('albuns/');
export const getAlbum = (id) => api.get(`albuns/${id}/`);
export const createAlbum = (album) => api.post('albuns/', album);
export const updateAlbum = (id, album) => api.put(`albuns/${id}/`, album);
export const deleteAlbum = (id) => api.delete(`albuns/${id}/`);

// FOTOS
export const getFotos = () => api.get('fotos/');
export const getFoto = (id) => api.get(`fotos/${id}/`);
export const createFoto = (foto) => api.post('fotos/', foto);
export const updateFoto = (id, foto) => api.put(`fotos/${id}/`, foto);
export const deleteFoto = (id) => api.delete(`fotos/${id}/`);
