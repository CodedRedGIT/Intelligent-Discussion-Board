from django.http import HttpResponse
from django.template.response import TemplateResponse


# Create your views here.
def index(request):
    return TemplateResponse(
        request,
        "qanow/index.html",
        {

        })
