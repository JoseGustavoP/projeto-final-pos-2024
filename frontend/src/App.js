import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsuarioList from './components/UsuarioList';
import Form from './components/Form';
import TarefaList from './components/TarefaList';
import PostagemList from './components/PostagemList';
import AlbumList from './components/AlbumList';
import FotoList from './components/FotoList';
import ComentarioList from './components/ComentarioList';

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <h1>Cliente Web API</h1>
          <nav>
            <ul>
              <li>
                <Link to="/usuarios">Usuários</Link>
              </li>
              <li>
                <Link to="/usuarios/criar">Criar Usuário</Link>
              </li>
              <li>
                <Link to="/tarefas">Tarefas</Link>
              </li>
              <li>
                <Link to="/postagens">Postagens</Link>
              </li>
              <li>
                <Link to="/albuns">Álbuns</Link>
              </li>
              <li>
                <Link to="/fotos">Fotos</Link>
              </li>
              <li>
                <Link to="/comentarios">Comentários</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/usuarios" element={<UsuarioList />} />
            <Route path="/usuarios/criar" element={<Form tipo="usuario" />} />
            <Route path="/usuarios/editar/:id" element={<Form tipo="usuario" />} />
            <Route path="/tarefas" element={<TarefaList />} />
            <Route path="/tarefas/criar" element={<Form tipo="tarefa" />} />
            <Route path="/postagens" element={<PostagemList />} />
            <Route path="/postagens/criar" element={<Form tipo="postagem" />} />
            <Route path="/albuns" element={<AlbumList />} />
            <Route path="/albuns/criar" element={<Form tipo="album" />} />
            <Route path="/fotos" element={<FotoList />} />
            <Route path="/fotos/criar" element={<Form tipo="foto" />} />
            <Route path="/comentarios" element={<ComentarioList />} />
            <Route path="/comentarios/criar" element={<Form tipo="comentario" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
