import React, { useEffect, useState } from 'react';
import { getTarefas } from '../api';
import { Link } from 'react-router-dom';

const TarefaList = () => {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    getTarefas().then((response) => setTarefas(response.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Tarefas</h2>
      <div className="list-group">
        {tarefas.map((tarefa) => (
          <div key={tarefa.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h3>{tarefa.titulo}</h3>
              <p>
                <strong>Status:</strong> {tarefa.concluido ? 'Concluída' : 'Pendente'}
              </p>
            </div>
            <Link to={`/tarefas/editar/${tarefa.id}`} className="btn btn-primary">
              Editar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TarefaList;
