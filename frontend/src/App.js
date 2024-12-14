import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Importando o Sidebar
import UsuarioList from './components/UsuarioList'; // Importe os componentes
import TarefaList from "./components/TarefaList";
import PostagemList from "./components/PostagemList";

const App = () => {
  return (
    <Router>
      <div id="wrapper">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Content Wrapper, agora fora do <Routes> */}
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <main>
              {/* Página inicial, colocada dentro de <Route> */}
              <Routes>
                <Route path="/" element={<UsuarioList />} />
                <Route path="/tarefas" element={<TarefaList />} />
                <Route path="/postagens" element={<PostagemList />} />

              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
