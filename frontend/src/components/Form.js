import React, { useState } from 'react';
import {
  createUsuario, updateUsuario,
  createTarefa, updateTarefa,
  createPostagem, updatePostagem,
  createComentario, updateComentario,
  createAlbum, updateAlbum,
  createFoto, updateFoto
} from '../api';

const Form = ({ tipo, recursoEditado }) => {
  const [nome, setNome] = useState(recursoEditado ? recursoEditado.nome : '');
  const [email, setEmail] = useState(recursoEditado ? recursoEditado.email : '');
  const [nomeUsuario, setNomeUsuario] = useState(recursoEditado ? recursoEditado.nome_usuario : '');
  const [titulo, setTitulo] = useState(recursoEditado ? recursoEditado.titulo : '');
  const [conteudo, setConteudo] = useState(recursoEditado ? recursoEditado.conteudo : '');
  const [concluido, setConcluido] = useState(recursoEditado ? recursoEditado.concluido : false);
  const [url, setUrl] = useState(recursoEditado ? recursoEditado.url : '');
  const [urlMiniatura, setUrlMiniatura] = useState(recursoEditado ? recursoEditado.url_miniatura : '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação simples
    if (!nome || !email || !nomeUsuario) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const data = {
      nome,
      email,
      nome_usuario: nomeUsuario,
      titulo,
      conteudo,
      concluido,
      url,
      url_miniatura: urlMiniatura
    };

    try {
      setLoading(true);

      switch (tipo) {
        case 'usuario':
          if (recursoEditado) {
            await updateUsuario(recursoEditado.id, data);
          } else {
            await createUsuario(data);
          }
          break;
        case 'tarefa':
          if (recursoEditado) {
            await updateTarefa(recursoEditado.id, data);
          } else {
            await createTarefa(data);
          }
          break;
        case 'postagem':
          if (recursoEditado) {
            await updatePostagem(recursoEditado.id, data);
          } else {
            await createPostagem(data);
          }
          break;
        case 'comentario':
          if (recursoEditado) {
            await updateComentario(recursoEditado.id, data);
          } else {
            await createComentario(data);
          }
          break;
        case 'album':
          if (recursoEditado) {
            await updateAlbum(recursoEditado.id, data);
          } else {
            await createAlbum(data);
          }
          break;
        case 'foto':
          if (recursoEditado) {
            await updateFoto(recursoEditado.id, data);
          } else {
            await createFoto(data);
          }
          break;
        default:
          break;
      }

      alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} salvo com sucesso!`);
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Ocorreu um erro ao salvar os dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{recursoEditado ? `Editar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}` : `Criar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`}</h2>
      
      {tipo === 'usuario' && (
        <>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nome de Usuário"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
          />
        </>
      )}

      {tipo === 'tarefa' && (
        <>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <label>
            Concluída:
            <input
              type="checkbox"
              checked={concluido}
              onChange={(e) => setConcluido(e.target.checked)}
            />
          </label>
        </>
      )}

      {tipo === 'postagem' && (
        <>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <textarea
            placeholder="Conteúdo"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />
        </>
      )}

      {tipo === 'comentario' && (
        <>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Conteúdo"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />
        </>
      )}

      {tipo === 'album' && (
        <input
          type="text"
          placeholder="Título do Álbum"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      )}

      {tipo === 'foto' && (
        <>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            type="url"
            placeholder="URL da Foto"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="url"
            placeholder="URL da Miniatura"
            value={urlMiniatura}
            onChange={(e) => setUrlMiniatura(e.target.value)}
          />
        </>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : (recursoEditado ? `Atualizar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}` : `Criar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`)}
      </button>
    </form>
  );
};

export default Form;
