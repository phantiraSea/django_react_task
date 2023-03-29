from django.urls import path,include

urlpatterns = [
    path('user/',include('api.users.urls')),
    path('project/',include('api.projects.urls')),
]
