from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, render_to_response

from django.http import HttpResponse

from django.contrib.auth.models import User, Group



import json
from django.core import serializers



def index(request): 
    return render_to_response('index.html')


def financiacion(request):      
    return render_to_response('financiacion.html')


def ciclo(request):      
    return render_to_response('ciclo.html')


def gastos(request):      
    return render_to_response('gastos.html')


def ejecucion(request):      
    return render_to_response('ejecucion.html')


def equipoTecnico(request):      
    return render_to_response('equipo-tecnico.html')


def sobre(request):      
    return render_to_response('sobre.html')