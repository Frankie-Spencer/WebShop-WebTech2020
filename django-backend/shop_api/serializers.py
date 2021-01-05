from rest_framework import serializers
from .models import (Item,
                     Cart,
                     CartItem)


class ItemViewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['id',
                  'title',
                  'description',
                  'price',
                  'user',
                  'buyer',
                  'status',
                  'date_added']


class ItemCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['id',
                  'title',
                  'description',
                  'price',
                  'user',
                  'buyer',
                  'status']

        read_only_fields = ['user']

    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        return attrs


class ItemEditSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['price']


class CartItemViewSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = ['item_code',
                  'title',
                  'description',
                  'current_price',
                  'client',
                  'status']


class CartItemAddSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = ['client',
                  'item']

        read_only_fields = ['client']

    def validate(self, attrs):
        attrs['client'] = self.context['request'].user
        return attrs


class CartItemRemoveSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = ['item',
                  'title',
                  'description',
                  'current_price']

    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        return attrs


class CartItemRemoveAllSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = ['user',
                  'items',
                  'price_total']

    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        return attrs


class CartPaySerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = ['items',
                  'price_total',
                  'pay_confirm']

        read_only_fields = ['items', 'price_total']

    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        return attrs
