import React, { useState, useEffect } from 'react';
import { getTarefas, createTarefa, updateTarefa, deleteTarefa, getUsuarios } from '../api'; // Importando funções da API

const TarefaList = () => {
  const [tarefas, setTarefas] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // Para armazenar a lista de usuários
  const [newTarefa, setNewTarefa] = useState({ titulo: '', usuario: '', concluido: false }); // usuario agora será um ID do usuário

  // Buscar tarefas e usuários ao carregar o componente
  useEffect(() => {
    fetchTarefas();
    fetchUsuarios(); // Busca os usuários também
  }, []);

  const fetchTarefas = async () => {
    try {
      const response = await getTarefas();
      setTarefas(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
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
    // Validar dados antes de criar a tarefa
    if (!newTarefa.titulo || !newTarefa.usuario) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      await createTarefa(newTarefa);
      fetchTarefas(); // Atualiza a lista após criação
      setNewTarefa({ titulo: '', usuario: '', concluido: false }); // Limpa o formulário
    } catch (error) {
      console.error('Erro ao criar tarefa:', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdate = async (id, concluido) => {
    // Validar dados antes de atualizar a tarefa
    if (!newTarefa.titulo || !newTarefa.usuario) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      const updatedTarefa = {
        ...newTarefa,  // Envia todos os dados do formulário
        concluido: !concluido  // Apenas inverte o status de concluído
      };
      await updateTarefa(id, updatedTarefa);
      fetchTarefas();
      setNewTarefa({ titulo: '', usuario: '', concluido: false }); // Limpa o formulário após a atualização
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTarefa(id);
      fetchTarefas(); // Atualiza a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error.response ? error.response.data : error.message);
    }
  };

  const getUsuarioNomeById = (usuarioId) => {
    const usuario = usuarios.find((user) => user.id === usuarioId);
    return usuario ? usuario.nome : 'Usuário desconhecido';
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Tarefas</h1>

      {/* Formulário para criar nova tarefa */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          value={newTarefa.titulo}
          onChange={(e) => setNewTarefa({ ...newTarefa, titulo: e.target.value })}
          placeholder="Título da Tarefa"
        />
        <select
          className="form-control mb-2"
          value={newTarefa.usuario}
          onChange={(e) => setNewTarefa({ ...newTarefa, usuario: e.target.value })}
        >
          <option value="">Selecione o Usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={newTarefa.concluido}
            onChange={(e) => setNewTarefa({ ...newTarefa, concluido: e.target.checked })}
            id="concluidoCheck"
          />
          <label className="form-check-label" htmlFor="concluidoCheck">
            Concluída
          </label>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>Criar Tarefa</button>
      </div>

      {/* Lista de tarefas */}
      <ul className="list-group">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className="list-group-item d-flex justify-content-between align-items-center">
            {tarefa.titulo} - {tarefa.concluido ? 'Concluída' : 'Pendente'} - 
            <strong>{getUsuarioNomeById(tarefa.usuario)}</strong>
            <div>
              <button
                className="btn btn-warning btn-sm mx-1"
                onClick={() => handleUpdate(tarefa.id, tarefa.concluido)}
              >
                {tarefa.concluido ? 'Marcar como Pendente' : 'Marcar como Concluída'}
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(tarefa.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TarefaList;
