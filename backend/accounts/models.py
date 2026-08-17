from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    location = models.CharField(
        max_length=150,
        blank=True
    )

    degree = models.CharField(
        max_length=150,
        blank=True
    )

    college = models.CharField(
        max_length=200,
        blank=True
    )

    field_of_study = models.CharField(
        max_length=150,
        blank=True
    )

    graduation_year = models.CharField(
        max_length=10,
        blank=True
    )

    current_job_title = models.CharField(
        max_length=150,
        blank=True
    )

    years_of_experience = models.CharField(
        max_length=50,
        blank=True
    )

    skills = models.TextField(
        blank=True
    )

    preferred_job_role = models.CharField(
        max_length=150,
        blank=True
    )

    preferred_work_location = models.CharField(
        max_length=150,
        blank=True
    )

    linkedin = models.URLField(
        blank=True
    )

    github = models.URLField(
        blank=True
    )

    portfolio = models.URLField(
        blank=True
    )

    about = models.TextField(
        blank=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.user.username} Profile"