from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, serializers

from .models import Application, Interview
from .serializers import (
    ApplicationSerializer,
    InterviewSerializer,
)


class ApplicationViewSet(viewsets.ModelViewSet):

    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            owner=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(
            owner=self.request.user
        )


class InterviewViewSet(viewsets.ModelViewSet):

    serializer_class = InterviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Interview.objects.filter(
            application__owner=self.request.user
        ).order_by("date", "time")

    def perform_create(self, serializer):

        application = serializer.validated_data[
            "application"
        ]

        if application.owner != self.request.user:
            raise serializers.ValidationError(
                "You cannot create an interview for this application."
            )

        serializer.save()