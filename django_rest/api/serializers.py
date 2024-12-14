from rest_framework import serializers
from .models import Usuario, Tarefa, Postagem, Comentario, Album, Foto

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'nome_usuario']

class TarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefa
        fields = ['id', 'usuario', 'titulo', 'concluido']

class PostagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postagem
        fields = ['id', 'usuario', 'titulo', 'conteudo']

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ['id', 'postagem', 'nome', 'email', 'conteudo']

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'usuario', 'titulo']

class FotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foto
        fields = ['id', 'album', 'titulo', 'url', 'url_miniatura']
