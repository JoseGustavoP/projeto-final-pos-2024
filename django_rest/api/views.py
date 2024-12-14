from rest_framework import viewsets
from .models import Usuario, Tarefa, Postagem, Comentario, Album, Foto
from .serializers import (
    UsuarioSerializer, TarefaSerializer, PostagemSerializer,
    ComentarioSerializer, AlbumSerializer, FotoSerializer
)

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

class PostagemViewSet(viewsets.ModelViewSet):
    queryset = Postagem.objects.all()
    serializer_class = PostagemSerializer

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

class FotoViewSet(viewsets.ModelViewSet):
    queryset = Foto.objects.all()
    serializer_class = FotoSerializer