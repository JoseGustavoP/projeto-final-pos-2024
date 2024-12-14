import React, { useEffect, useState } from 'react';
import { getTarefas } from '../api';
import { Link } from 'react-router-dom';

const TarefaList = () => {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    getTarefas().then((response) => setTarefas(response.data));
  }, []);

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <h3>{tarefa.titulo}</h3>
            <p>{tarefa.concluido ? 'Concluída' : 'Pendente'}</p>
            <Link to={`/tarefas/editar/${tarefa.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TarefaList;
