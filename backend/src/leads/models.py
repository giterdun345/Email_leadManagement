from django.db import models


class Target(models.Model):
    name = models.CharField(max_length=50, unique=True)
    company = models.CharField(max_length=50, blank=True)
    category = models.CharField(max_length=50, blank=True)
    email = models.EmailField(max_length=100, blank=True)
    domain = models.CharField(max_length= 50, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    personal = models.URLField(max_length=200, blank=True)
    twitter = models.URLField(max_length=200, blank=True)
    linkedin = models.URLField(max_length=200, blank=True)
    angel = models.URLField(max_length=200, blank=True)
    crunchbase = models.URLField(max_length=200, blank=True)
    reply = models.BooleanField(default=False)
    email_confirmed = models.BooleanField(default=False)
    date_sent = models.DateTimeField(null= True, editable=True, blank=True)
    email_sent = models.BooleanField(default=False)
    followup_sent = models.BooleanField(default=False)
    key = models.AutoField(primary_key=True, unique=True)

    def __str__(self):
        return self.name
