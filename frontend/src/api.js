import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/'; // URL da sua API Django

const api = axios.create({
  baseURL: API_URL,
});

// Funções para Usuários
export const getUsuarios = () => api.get('usuarios/');
export const createUsuario = (data) => api.post('usuarios/', data);
export const updateUsuario = (id, data) => api.put(`usuarios/${id}/`, data);
export const deleteUsuario = (id) => api.delete(`usuarios/${id}/`);

// Funções para Tarefas
export const getTarefas = () => api.get('tarefas/');
export const createTarefa = (data) => api.post('tarefas/', data);
export const updateTarefa = (id, data) => api.put(`tarefas/${id}/`, data);
export const deleteTarefa = (id) => api.delete(`tarefas/${id}/`);

// Funções para Postagens
export const getPostagens = () => api.get('postagens/');
export const createPostagem = (data) => api.post('postagens/', data);
export const updatePostagem = (id, data) => api.put(`postagens/${id}/`, data);
export const deletePostagem = (id) => api.delete(`postagens/${id}/`);

// Funções para Comentários
export const getComentarios = () => api.get('comentarios/');
export const createComentario = (data) => api.post('comentarios/', data);
export const updateComentario = (id, data) => api.put(`comentarios/${id}/`, data);
export const deleteComentario = (id) => api.delete(`comentarios/${id}/`);

// Funções para Álbuns
export const getAlbuns = () => api.get('albuns/');
export const createAlbum = (data) => api.post('albuns/', data);
export const updateAlbum = (id, data) => api.put(`albuns/${id}/`, data);
export const deleteAlbum = (id) => api.delete(`albuns/${id}/`);

// Funções para Fotos
export const getFotos = () => api.get('fotos/');
export const createFoto = (data) => api.post('fotos/', data);
export const updateFoto = (id, data) => api.put(`fotos/${id}/`, data);
export const deleteFoto = (id) => api.delete(`fotos/${id}/`);

export default api;
