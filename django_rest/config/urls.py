from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'tarefas', views.TarefaViewSet)
router.register(r'postagens', views.PostagemViewSet)
router.register(r'comentarios', views.ComentarioViewSet)
router.register(r'albuns', views.AlbumViewSet)
router.register(r'fotos', views.FotoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]