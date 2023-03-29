from rest_framework import viewsets
from .serializers import ProjectSerializer
from .models import Project
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
import openai
from backend.settings import OPEN_API_KEY


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    lookup_field = 'id'
    parser_classes = [FormParser, MultiPartParser, JSONParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context
    
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
    
    def list(self, request):
        queryset = Project.objects.filter(owner=self.request.user)
        serializer = ProjectSerializer(queryset,many=True)
        return Response(serializer.data)


class ChatView(APIView):
    def get(self ,request ,question):
        if question:
            openai.api_key = OPEN_API_KEY
            completion = openai.ChatCompletion.create(
                            model="gpt-3.5-turbo", 
                            messages=[{"role": "user", "content": question}]
                        )
            ans = completion.choices[0].message.content
            context = {'answer': ans}
        else:
            context = {'answer': ''}
        return Response(context)