from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    nome_usuario = models.CharField(max_length=50, unique=True)

class Tarefa(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    concluido = models.BooleanField(default=False)

class Postagem(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    conteudo = models.TextField()

class Comentario(models.Model):
    postagem = models.ForeignKey(Postagem, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    conteudo = models.TextField()

class Album(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)

class Foto(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    url = models.URLField()
    url_miniatura = models.URLField()
