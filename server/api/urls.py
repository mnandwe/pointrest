from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token 
from . import views

markedpoint_list = views.MarkedPointViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
markedpoint_detail = views.MarkedPointViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path(r'markedpoints/', markedpoint_list, name='MarkedPointList'),
    path(r'markedpoints/<uuid:pk>/', markedpoint_detail, name='MarkedPointDetail'),
    path(r'users/', views.UserCreate.as_view(), name='account_create'),
    path(r'token-auth/', views.UserAuthToken.as_view(), name='api_token_auth'),
    path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]