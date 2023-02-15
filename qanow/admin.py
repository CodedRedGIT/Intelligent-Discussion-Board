from django.contrib import admin

from .models import *

admin.site.register(Member)
admin.site.register(Class)
admin.site.register(Question)
admin.site.register(Post)
