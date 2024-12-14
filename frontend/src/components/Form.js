import React, { useState, useEffect } from 'react';
import {
    createUsuario, updateUsuario,
    createTarefa, updateTarefa,
    createPostagem, updatePostagem,
    createComentario, updateComentario,
    createAlbum, updateAlbum,
    createFoto, updateFoto
} from '../api';

const Form = ({ tipo, recursoEditado, postagens = [], albuns = [] }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioId, setUsuarioId] = useState(recursoEditado ? recursoEditado.usuario_id : '');
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState(recursoEditado ? recursoEditado.nome : '');
    const [email, setEmail] = useState(recursoEditado ? recursoEditado.email : '');
    const [nomeUsuario, setNomeUsuario] = useState(recursoEditado ? recursoEditado.nome_usuario : '');
    const [titulo, setTitulo] = useState(recursoEditado ? recursoEditado.titulo : '');
    const [conteudo, setConteudo] = useState(recursoEditado ? recursoEditado.conteudo : '');
    const [concluido, setConcluido] = useState(recursoEditado ? recursoEditado.concluido : false);
    const [url, setUrl] = useState(recursoEditado ? recursoEditado.url : '');
    const [urlMiniatura, setUrlMiniatura] = useState(recursoEditado ? recursoEditado.url_miniatura : '');
    const [postagemId, setPostagemId] = useState(recursoEditado ? recursoEditado.postagem_id : '');
    const [albumId, setAlbumId] = useState(recursoEditado ? recursoEditado.album_id : '');

    // Função para buscar usuários
    const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/usuarios/');
            if (!response.ok) {
                throw new Error('Erro ao buscar usuários');
            }
            const data = await response.json();
            setUsuarios(data); // Atualizando o estado com os dados dos usuários
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios(); // Chama a função quando o componente é montado
    }, []);

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
            url_miniatura: urlMiniatura,
            usuario: usuarioId, // Associa o id do usuario
            postagem: postagemId, // Associa o id da postagem
            album: albumId, // Associa o id do album
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
                    <select value={usuarioId || ''} onChange={(e) => setUsuarioId(e.target.value)}>
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
                    <select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)}>
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
                    <select value={postagemId} onChange={(e) => setPostagemId(e.target.value)}>
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
                <>
                    <select value={albumId} onChange={(e) => setAlbumId(e.target.value)}>
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
                    <input
                        type="text"
                        placeholder="Título do Álbum"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </>
            )}

            {tipo === 'foto' && (
                <>
                    <select value={albumId} onChange={(e) => setAlbumId(e.target.value)}>
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
