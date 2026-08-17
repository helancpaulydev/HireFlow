from rest_framework import serializers

from .models import Application, Interview


class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application

        fields = [
            "id",
            "company",
            "job_title",
            "location",
            "job_link",
            "date_applied",
            "status",
            "notes",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]


class InterviewSerializer(serializers.ModelSerializer):

    company = serializers.CharField(
        source="application.company",
        read_only=True
    )

    job_title = serializers.CharField(
        source="application.job_title",
        read_only=True
    )

    class Meta:
        model = Interview

        fields = [
            "id",
            "application",
            "company",
            "job_title",
            "date",
            "time",
            "interview_type",
            "status",
            "notes",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "company",
            "job_title",
            "created_at",
        ]