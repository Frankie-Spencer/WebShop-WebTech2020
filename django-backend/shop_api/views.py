from django.shortcuts import get_object_or_404
from rest_framework import filters
from rest_framework.response import Response
from .send_email import send_email
from .models import (Item,
                     Cart,
                     CartItem,
                     Payment)

from .serializers import (ItemViewSerializer,
                          ItemEditSerializer,
                          ItemCreateSerializer,
                          CartItemViewSerializer,
                          CartItemAddSerializer,
                          CartItemRemoveSerializer,
                          CartPaySerializer,
                          CartItemRemoveAllSerializer)

from rest_framework.generics import (ListAPIView, 
                                     RetrieveAPIView, 
                                     CreateAPIView, 
                                     RetrieveDestroyAPIView, 
                                     UpdateAPIView, 
                                     ListCreateAPIView)

from rest_framework.permissions import (AllowAny,
                                        IsAuthenticated)

from rest_framework.status import (HTTP_200_OK, 
                                   HTTP_400_BAD_REQUEST)


payment = True


class ItemListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ItemViewSerializer
    queryset = Item.objects.filter(status='available').order_by('-date_added')
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']


class MyItemAvailableListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemViewSerializer
    pagination_class = None

    def get_queryset(self):
        user = self.request.user
        queryset = Item.objects.filter(user=user,
                                       status='available')

        return queryset


class MyItemSoldListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemViewSerializer
    pagination_class = None

    def get_queryset(self):
        user = self.request.user
        queryset = Item.objects.filter(user=user,
                                       status='sold')

        return queryset


class MyItemsBoughtListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemViewSerializer
    pagination_class = None

    def get_queryset(self):
        user = self.request.user
        queryset = Item.objects.filter(buyer=user,
                                       status='sold')

        return queryset


class ItemDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = ItemViewSerializer

    def get_object(self, queryset=None, **kwargs):
        item_id = self.kwargs.get('pk')
        item_obj = Item.objects.get(pk=item_id)

        if item_obj.status == 'available':
            return get_object_or_404(Item,
                                     id=item_id)

        elif item_obj.status == 'sold':
            user = self.request.user
            if item_obj.user == user:
                return get_object_or_404(Item,
                                         id=item_id)

            elif item_obj.buyer == user:
                return get_object_or_404(Item,
                                         id=item_id)


class ItemAddView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemCreateSerializer


class ItemEditDetailGetView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemViewSerializer

    def get_object(self, queryset=None, **kwargs):
        item_id = self.kwargs.get('pk', None)
        user = self.request.user
        queryset = Item.objects.filter(user=user,
                                       status='available')

        item_obj = get_object_or_404(queryset,
                                     pk=item_id)

        return item_obj


class ItemEditView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemEditSerializer

    def get_object(self, queryset=None, **kwargs):
        item_id = self.kwargs.get('pk', None)
        user = self.request.user
        queryset = Item.objects.filter(user=user,
                                       status='available')

        item_obj = get_object_or_404(queryset,
                                     pk=item_id)
        return item_obj


class ItemDeleteView(RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemViewSerializer

    def get_object(self, queryset=None, **kwargs):
        item_id = self.kwargs.get('pk', None)
        user = self.request.user
        queryset = Item.objects.filter(user=user,
                                       status='available')

        item_obj = get_object_or_404(queryset,
                                     pk=item_id)

        return item_obj


class CartItemListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemViewSerializer
    pagination_class = None

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        users_cart = Cart.objects.filter(user=user).first()

        if users_cart:
            queryset = users_cart.items.all()

            return queryset


class CartItemAddView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemAddSerializer

    def post(self, request, *args, **kwargs):
        user = self.request.user
        item_id = self.request.data.get('item')

        if item_id:
            item_obj = get_object_or_404(Item.objects.all(),
                                         id=item_id)

            users_cart = Cart.objects.filter(user=user).first()

            if item_obj.user != user:
                if item_obj.status == 'available':
                    if not users_cart:
                        Cart.objects.create(user=user)
                        users_cart = Cart.objects.filter(user=user).first()

                    users_cart_id = users_cart.id
                    exists = len(CartItem.objects.filter(client=user,
                                                         item=item_id)) != 0

                    if not exists:
                        cart_item_obj = CartItem.objects.create(item=item_obj,
                                                                item_code=item_obj.id,
                                                                title=item_obj.title,
                                                                description=item_obj.description,
                                                                current_price=item_obj.price,
                                                                client=user)

                        users_cart = Cart.objects.get(id=users_cart_id)
                        users_cart.items.add(cart_item_obj)

                        data = {'client': user.id, 'item': int(item_id)}
                        return Response(data, status=HTTP_200_OK)

                    else:
                        msg = {'error message': 'This item is already in your cart'}
                        return Response(msg, status=HTTP_400_BAD_REQUEST)

                else:
                    msg = {'error message': 'This item is not available'}
                    return Response(msg, status=HTTP_400_BAD_REQUEST)

            else:
                msg = {'error message': 'This item is yours'}
                return Response(msg, status=HTTP_400_BAD_REQUEST)
        else:
            msg = {'error message': 'Item not selected'}
            return Response(msg, status=HTTP_400_BAD_REQUEST)


class CartItemRemoveView(RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemRemoveSerializer

    def get_object(self):
        queryset = CartItem.objects.filter(client=self.request.user)

        return get_object_or_404(queryset,
                                 item_code=self.kwargs.get('pk'))

    def delete(self, request, *args, **kwargs):
        item_id = self.kwargs.get('pk', None)
        user = self.request.user
        cart_item_obj = CartItem.objects.filter(client=user,
                                                item_code=item_id)

        exists = len(cart_item_obj) != 0

        if exists:
            users_cart_id = Cart.objects.filter(user=user).first().id
            users_cart = Cart.objects.get(id=users_cart_id)
            users_cart_items = users_cart.items.all()
            cart_item_obj_id = cart_item_obj.first().id
            item_obj = get_object_or_404(cart_item_obj,
                                         id=cart_item_obj_id)

            only_item = len(users_cart_items) == 1

            if only_item:
                item_obj.delete()
                Cart.objects.get(id=users_cart_id).delete()

                msg = {'message': 'Item and cart successfully removed'}
                return Response(msg, status=HTTP_200_OK)

            elif not only_item:
                item_obj.delete()

                msg = {'message': 'Item successfully removed'}
                return Response(msg, status=HTTP_200_OK)

        else:
            msg = {'error message': 'Item does not exists'}
            return Response(msg, status=HTTP_400_BAD_REQUEST)


class CartItemRemoveAllView(RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemRemoveAllSerializer

    def get_object(self):
        cart_obj = Cart.objects.filter(user=self.request.user)

        return get_object_or_404(cart_obj,
                                 user=self.request.user)

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        cart_item_objs = CartItem.objects.filter(client=user)
        exists = len(cart_item_objs) != 0

        if exists:
            users_cart_id = Cart.objects.filter(user=user).first().id
            users_cart = Cart.objects.get(id=users_cart_id)

            cart_item_objs.delete()
            users_cart.delete()

            msg = {'message': 'All items and cart successfully removed'}
            return Response(msg,
                            status=HTTP_200_OK)

        else:
            msg = {'error message': 'Items does not exists'}
            return Response(msg,
                            status=HTTP_400_BAD_REQUEST)


class CartPayView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartPaySerializer

    def get_queryset(self):
        queryset = Cart.objects.filter(user=self.request.user)
        return queryset

    def post(self, *args, **kwargs):
        user = self.request.user
        item_id = self.request.data.get('pay_confirm')
        if item_id == 'pay':
            users_cart = Cart.objects.filter(user=user)
            cart_exists = len(users_cart) != 0
            if cart_exists:
                users_cart_id = users_cart.first().id
                users_cart = Cart.objects.get(id=users_cart_id)
                users_cart_items = users_cart.items.all()

                changes = False

                users_cart_items_info = [{'id': item.id,
                                          'item': item.item,
                                          'item_code': item.item_code,
                                          'current_price': item.current_price} for item in users_cart_items]

                for item in users_cart_items_info:
                    item_obj = Item.objects.filter(id=item['item_code'],
                                                   status='available').first()

                    if item_obj:
                        if item_obj.price != item['current_price']:
                            cart_item_obj = CartItem.objects.get(id=item['id'])
                            cart_item_obj.status = 'price changed'
                            cart_item_obj.current_price = item_obj.price
                            cart_item_obj.save()
                            changes = True

                    elif not item_obj:
                        cart_item_obj = CartItem.objects.get(id=item['id'])
                        cart_item_obj.status = 'item not available'
                        cart_item_obj.save()
                        changes = True

                if not changes:
                    if payment:
                        users_cart_items_all = CartItem.objects.filter(client=user)

                        cart_items_json = [{'id': item.item_code,
                                            'title': item.title,
                                            'description': item.description,
                                            'price': item.current_price,
                                            'date_added': item.date_added.strftime("%d/%m/%Y-%H:%M:%S"),
                                            'user': item.item.user.id}
                                           for item in users_cart_items_all]

                        payment_obj = Payment.objects.create(user=user,
                                                             cart_items=cart_items_json,
                                                             payment_status='confirmed',
                                                             payment_total=users_cart.price_total)

                        payment_obj.save()
                        users_cart_items_all.delete()
                        users_cart.delete()

                        seller_dic = {}
                        for item in users_cart_items_info:
                            item_obj = Item.objects.get(id=item['item_code'])
                            item_obj.status = 'sold'
                            item_obj.buyer = user
                            item_obj.save()

                            if not item_obj.user.email in seller_dic:
                                seller_dic.update({item_obj.user.email: [{'item': item_obj.title,
                                                                          'price': item_obj.price,
                                                                          'seller': item_obj.user.user_name}]})

                            elif item_obj.user.email in seller_dic:
                                seller_dic[item_obj.user.email].append({'item': item_obj.title,
                                                                        'price': item_obj.price,
                                                                        'seller': item_obj.user.user_name})

                        send_email(user.email, user.user_name, seller_dic)

                        msg = {'message': 'Payment successful and transaction confirmed, Thanks!'}
                        return Response(msg,
                                        status=HTTP_200_OK)

                    else:
                        msg = {'error message': 'Payment not confirmed by service provider'}
                        return Response(msg,
                                        status=HTTP_400_BAD_REQUEST)

                else:
                    msg = {'error message': 'There are some changes to your cart items'}
                    return Response(msg,
                                    status=HTTP_400_BAD_REQUEST)

            else:
                msg = {'error message': 'You have no active cart to pay'}
                return Response(msg,
                                status=HTTP_400_BAD_REQUEST)

        else:
            msg = {'error message': 'Payment not confirmed by user'}
            return Response(msg,
                            status=HTTP_400_BAD_REQUEST)
