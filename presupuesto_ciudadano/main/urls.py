from django.conf.urls import url,include

from . import views


from django.conf.urls import url, include

from main import views



urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^financiacion/$', views.financiacion, name='financiacion'),
    url(r'^ciclo/$', views.ciclo, name='ciclo'),
	url(r'^gastos/$', views.gastos, name='gastos'),
	url(r'^ejecucion/$', views.ejecucion, name='ejecucion'),
   url(r'^equipo-tecnico/$', views.equipoTecnico, name='equipo-tecnico'),
   url(r'^sobre/$', views.sobre, name='sobre'),

]
