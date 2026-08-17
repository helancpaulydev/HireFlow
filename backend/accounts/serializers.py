from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):

    name = serializers.CharField(
        source="user.first_name",
        required=False
    )

    email = serializers.EmailField(
        source="user.email",
        required=False
    )

    class Meta:
        model = UserProfile

        fields = [
            "name",
            "email",
            "phone",
            "location",
            "degree",
            "college",
            "field_of_study",
            "graduation_year",
            "current_job_title",
            "years_of_experience",
            "skills",
            "preferred_job_role",
            "preferred_work_location",
            "linkedin",
            "github",
            "portfolio",
            "about",
            "updated_at",
        ]

        read_only_fields = [
            "updated_at",
        ]

    def update(self, instance, validated_data):

        user_data = validated_data.pop(
            "user",
            {}
        )

        user = instance.user

        if "first_name" in user_data:
            user.first_name = user_data[
                "first_name"
            ]

        if "email" in user_data:
            user.email = user_data[
                "email"
            ]

        user.save()

        return super().update(
            instance,
            validated_data
        )
    from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):

    name = serializers.CharField(
        source="user.get_full_name",
        required=False
    )

    email = serializers.EmailField(
        source="user.email",
        required=False
    )

    class Meta:
        model = UserProfile

        fields = [
            "name",
            "email",
            "phone",
            "location",
            "degree",
            "college",
            "field_of_study",
            "graduation_year",
            "current_job_title",
            "years_of_experience",
            "skills",
            "preferred_job_role",
            "preferred_work_location",
            "linkedin",
            "github",
            "portfolio",
            "about",
            "updated_at",
        ]

        read_only_fields = [
            "updated_at",
        ]

    def update(self, instance, validated_data):

        user_data = validated_data.pop(
            "user",
            {}
        )

        user = instance.user

        if "get_full_name" in user_data:
            user.first_name = user_data[
                "get_full_name"
            ]

        if "email" in user_data:
            user.email = user_data[
                "email"
            ]

        user.save()

        return super().update(
            instance,
            validated_data
        )