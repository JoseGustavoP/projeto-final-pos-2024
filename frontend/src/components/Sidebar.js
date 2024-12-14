import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Cliente Web</div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Nav Items */}
      <li className="nav-item">
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-user"></i>
          <span>Usuários</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/tarefas">
          <i className="fas fa-fw fa-tasks"></i>
          <span>Tarefas</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/postagens">
          <i className="fas fa-fw fa-edit"></i>
          <span>Postagens</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/albuns">
          <i className="fas fa-fw fa-images"></i>
          <span>Álbuns</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/fotos">
          <i className="fas fa-fw fa-camera"></i>
          <span>Fotos</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/comentarios">
          <i className="fas fa-fw fa-comments"></i>
          <span>Comentários</span>
        </Link>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
};

export default Sidebar;
