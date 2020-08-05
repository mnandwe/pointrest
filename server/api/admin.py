from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import MarkedPoint

@admin.register(MarkedPoint)
class MarkedPointAdmin(OSMGeoAdmin):
    list_display = ('name', 'location')