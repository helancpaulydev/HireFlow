from django.db import models
from django.contrib.auth.models import User


class Application(models.Model):

    STATUS_CHOICES = [
        ("Applied", "Applied"),
        ("Shortlisted", "Shortlisted"),
        ("Interview", "Interview"),
        ("Offer", "Offer"),
        ("Rejected", "Rejected"),
        ("Withdrawn", "Withdrawn"),
    ]

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    company = models.CharField(max_length=150)

    job_title = models.CharField(max_length=150)

    location = models.CharField(
        max_length=150,
        blank=True
    )

    job_link = models.URLField(
        blank=True
    )

    date_applied = models.DateField()

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="Applied"
    )

    notes = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.company} - {self.job_title}"


class Interview(models.Model):

    TYPE_CHOICES = [
        ("Online", "Online"),
        ("Phone", "Phone"),
        ("In-person", "In-person"),
    ]

    STATUS_CHOICES = [
        ("Upcoming", "Upcoming"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    ]

    application = models.ForeignKey(
        Application,
        on_delete=models.CASCADE,
        related_name="interviews"
    )

    date = models.DateField()

    time = models.TimeField()

    interview_type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        default="Online"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Upcoming"
    )

    notes = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.application.company} - {self.application.job_title} - {self.date}"