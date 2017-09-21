from django.contrib import admin

# Register your models here.
from app.models import Track, Artist


class AuthorAdmin(admin.ModelAdmin):
    pass


admin.site.register(Track, AuthorAdmin)
admin.site.register(Artist, AuthorAdmin)
