from django.urls import path, include
from .views import CustomUserCreate, UpdatePassword, BlacklistTokenUpdateView  # CheckLoggedInStatus

app_name = 'account'

urlpatterns = [

    # user URLs
    path('signup/', CustomUserCreate.as_view(), name="create_user"),
    path('reset_password/', UpdatePassword.as_view(), name="reset_password"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),

]
