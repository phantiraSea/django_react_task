from django.db import models
from api.users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    complete = models.BooleanField(default=False)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    owner = models.ForeignKey(
                CustomUser, on_delete=models.CASCADE, blank=True, null=True
            )

    def __str__(self):
        return f"{self.name}"