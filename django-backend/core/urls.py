"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from django.contrib import admin
from .views import (main_page_states,
                    auto_db_populate,
                    auto_db_populate_random)

from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

urlpatterns = [

    # admin URL
    path('admin/', admin.site.urls),

    # main page URL
    path('', main_page_states, name='main_page'),

    # user-auth URLs
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/account/', include('account.urls', namespace='account')),

    # shop_api URLs
    path('api/', include('shop_api.urls', namespace='shop_api')),

    # auto db populate
    path('populatedb/<int:nu>/<int:ns>/<int:ni>/', auto_db_populate, name='auto_db_populate'),
    path('populatedb/<int:nu>/<int:ns>/<int:ni>/random/', auto_db_populate_random, name='auto_db_populate_random'),

]
