import uuid
from django.contrib.gis.db import models

"""MarkedPoint content type
"""
class MarkedPoint(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    location = models.PointField()
    owner = models.ForeignKey('auth.User', related_name='points', on_delete=models.CASCADE)