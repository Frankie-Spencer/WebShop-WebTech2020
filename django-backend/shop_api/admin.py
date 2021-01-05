from django.contrib import admin
from . import models


@admin.register(models.Item)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'date_added', 'status', 'buyer', 'price')


@admin.register(models.CartItem)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'item_code', 'status', 'current_price')


@admin.register(models.Cart)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('user', 'start_date', 'pay_confirm', 'price_total')


@admin.register(models.Payment)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('user', 'date_paid', 'payment_status', 'payment_total')
