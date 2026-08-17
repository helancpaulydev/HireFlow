from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import UserProfile
from .serializers import UserProfileSerializer


# ==========================================================
# SIGNUP
# ==========================================================

@api_view(["POST"])
def signup(request):

    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")

    if not name or not email or not password:
        return Response(
            {
                "message": "Please fill in all fields."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=email).exists():
        return Response(
            {
                "message": "An account with this email already exists."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=name
    )

    # Create an empty profile for the new user
    UserProfile.objects.create(
        user=user
    )

    return Response(
        {
            "message": "Account created successfully."
        },
        status=status.HTTP_201_CREATED
    )


# ==========================================================
# LOGIN
# ==========================================================

@api_view(["POST"])
def login(request):

    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {
                "message": "Please enter your email and password."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(
        username=email,
        password=password
    )

    if user is None:
        return Response(
            {
                "message": "Invalid email or password."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    return Response(
        {
            "message": "Login successful.",
            "user": {
                "id": user.id,
                "name": user.first_name,
                "email": user.email
            }
        },
        status=status.HTTP_200_OK
    )


# ==========================================================
# PROFILE
# ==========================================================

@api_view(["GET", "PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def profile(request):

    # Get existing profile or create one
    profile, created = UserProfile.objects.get_or_create(
        user=request.user
    )

    # ------------------------------------------------------
    # GET PROFILE
    # ------------------------------------------------------

    if request.method == "GET":

        serializer = UserProfileSerializer(
            profile
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # ------------------------------------------------------
    # UPDATE PROFILE
    # ------------------------------------------------------

    serializer = UserProfileSerializer(
        profile,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )