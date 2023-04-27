from django.contrib import admin

from .models import *

admin.site.register(Member)
admin.site.register(Class)
admin.site.register(Post)
admin.site.register(Reply)
admin.site.register(TextData)
admin.site.register(File)
admin.site.register(ParentReply)
