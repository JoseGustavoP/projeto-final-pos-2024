import React, { useState, useEffect } from 'react';
import {
    createUsuario, updateUsuario,
    createTarefa, updateTarefa,
    createPostagem, updatePostagem,
    createComentario, updateComentario,
    createAlbum, updateAlbum,
    createFoto, updateFoto
} from '../api';

const Form = ({ tipo, recursoEditado }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const [postagens, setPostagens] = useState([]);
    const [usuarioId, setUsuarioId] = useState(recursoEditado?.usuario_id || '');
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState(recursoEditado?.nome || '');
    const [email, setEmail] = useState(recursoEditado?.email || '');
    const [nomeUsuario, setNomeUsuario] = useState(recursoEditado?.nome_usuario || '');
    const [titulo, setTitulo] = useState(recursoEditado?.titulo || '');
    const [conteudo, setConteudo] = useState(recursoEditado?.conteudo || '');
    const [concluido, setConcluido] = useState(recursoEditado?.concluido || false);
    const [url, setUrl] = useState(recursoEditado?.url || '');
    const [urlMiniatura, setUrlMiniatura] = useState(recursoEditado?.url_miniatura || '');
    const [postagemId, setPostagemId] = useState(recursoEditado?.postagem_id || '');
    const [albumId, setAlbumId] = useState(recursoEditado?.album_id || '');

    const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/usuarios/');
            if (!response.ok) {
                throw new Error('Erro ao buscar usuários');
            }
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    const fetchAlbuns = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/albuns/');
            if (!response.ok) {
                throw new Error('Erro ao buscar albuns');
            }
            const data = await response.json();
            setAlbuns(data);
        } catch (error) {
            console.error('Erro ao buscar albuns:', error);
        }
    };

    const fetchPostagens = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/postagens/');
            if (!response.ok) {
                throw new Error('Erro ao buscar postagens');
            }
            const data = await response.json();
            setPostagens(data);
        } catch (error) {
            console.error('Erro ao buscar postagens:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
        fetchAlbuns();
        fetchPostagens();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nome,
            email,
            nome_usuario: nomeUsuario,
            titulo,
            conteudo,
            concluido,
            url,
            url_miniatura: urlMiniatura,
            usuario: usuarioId,
            postagem: postagemId,
            album: albumId,
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
        <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow">
            <h2 className="mb-4">{recursoEditado ? `Editar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}` : `Criar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`}</h2>

            {tipo === 'usuario' && (
                <>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome de Usuário"
                            value={nomeUsuario}
                            onChange={(e) => setNomeUsuario(e.target.value)}
                        />
                    </div>
                </>
            )}

            {tipo === 'tarefa' && (
                <>
                    <div className="mb-3">
                        <select className="form-select" value={usuarioId || ''} onChange={(e) => setUsuarioId(e.target.value)}>
                            <option value="">Selecione um Usuário</option>
                            {loading ? (
                                <option>Carregando...</option>
                            ) : (
                                usuarios.length > 0 ? (
                                    usuarios.map((usuario) => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.nome}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Nenhum usuário disponível</option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Título"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={concluido}
                            onChange={(e) => setConcluido(e.target.checked)}
                        />
                        <label className="form-check-label">Concluída</label>
                    </div>
                </>
            )}

            {tipo === 'postagem' && (
                <>
                    <div className="mb-3">
                        <select className="form-select" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)}>
                            <option value="">Selecione um Usuário</option>
                            {usuarios.length > 0 ? (
                                usuarios.map((usuario) => (
                                    <option key={usuario.id} value={usuario.id}>
                                        {usuario.nome}
                                    </option>
                                ))
                            ) : (
                                <option value="">Nenhum usuário disponível</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Título"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Conteúdo"
                            value={conteudo}
                            onChange={(e) => setConteudo(e.target.value)}
                        />
                    </div>
                </>
            )}

            {tipo === 'comentario' && (
                <>
                    <div className="mb-3">
                        <select className="form-select" value={postagemId} onChange={(e) => setPostagemId(e.target.value)}>
                            <option value="">Selecione uma Postagem</option>
                            {postagens.length > 0 ? (
                                postagens.map((postagem) => (
                                    <option key={postagem.id} value={postagem.id}>
                                        {postagem.titulo}
                                    </option>
                                ))
                            ) : (
                                <option value="">Nenhuma postagem disponível</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Conteúdo"
                            value={conteudo}
                            onChange={(e) => setConteudo(e.target.value)}
                        />
                    </div>
                </>
            )}

            {tipo === 'album' && (
                <>
                    <div className="mb-3">
                        <select className="form-select" value={usuarioId || ''} onChange={(e) => setUsuarioId(e.target.value)}>
                            <option value="">Selecione um Usuário</option>
                            {loading ? (
                                <option>Carregando...</option>
                            ) : (
                                usuarios.length > 0 ? (
                                    usuarios.map((usuario) => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.nome}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Nenhum usuário disponível</option>
                                )
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Título do Álbum"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                </>
            )}

            {tipo === 'foto' && (
                <>
                    <div className="mb-3">
                        <select className="form-select" value={albumId} onChange={(e) => setAlbumId(e.target.value)}>
                            <option value="">Selecione um Álbum</option>
                            {albuns.length > 0 ? (
                                albuns.map((album) => (
                                    <option key={album.id} value={album.id}>
                                        {album.titulo}
                                    </option>
                                ))
                            ) : (
                                <option value="">Nenhum álbum disponível</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Título"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="url"
                            className="form-control"
                            placeholder="URL da Foto"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="url"
                            className="form-control"
                            placeholder="URL da Miniatura"
                            value={urlMiniatura}
                            onChange={(e) => setUrlMiniatura(e.target.value)}
                        />
                    </div>
                </>
            )}

            <div className="mb-3 text-center">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Carregando...' : recursoEditado ? 'Atualizar' : 'Salvar'}
                </button>
            </div>
        </form>
    );
};

export default Form;
