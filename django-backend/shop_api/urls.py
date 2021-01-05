from .views import (ItemListView,
                    ItemDetailView,
                    ItemAddView,
                    ItemEditView,
                    ItemEditDetailGetView,
                    ItemDeleteView,
                    MyItemAvailableListView,
                    MyItemSoldListView,
                    MyItemsBoughtListView,
                    CartItemListView,
                    CartItemAddView,
                    CartItemRemoveView,
                    CartItemRemoveAllView,
                    CartPayView)

from django.urls import path

app_name = 'shop_api'

urlpatterns = [

    # item URLs
    path('', ItemListView.as_view(), name='item_list'),
    path('items/<int:pk>/', ItemDetailView.as_view(), name='item_detail'),

    # my items URLs
    path('myitems/available/', MyItemAvailableListView.as_view(), name='my_item_available'),
    path('myitems/sold/', MyItemSoldListView.as_view(), name='my_item_sold'),
    path('myitems/bought/', MyItemsBoughtListView.as_view(), name='my_item_bought'),
    path('myitems/add/', ItemAddView.as_view(), name='item_add'),
    path('myitems/edit/itemdetail/<int:pk>/', ItemEditDetailGetView.as_view(), name='item_detail'),
    path('myitems/edit/<int:pk>/', ItemEditView.as_view(), name='item_edit'),
    path('myitems/delete/<int:pk>/', ItemDeleteView.as_view(), name='item_delete'),

    # Cart
    path('myitems/cart/', CartItemListView.as_view(), name='cart'),
    path('myitems/cart/add/', CartItemAddView.as_view(), name='cart_item_add'),
    path('myitems/cart/remove/<int:pk>/', CartItemRemoveView.as_view(), name='cart_item_remove'),
    path('myitems/cart/removeall/', CartItemRemoveAllView.as_view(), name='cart_item_remove_all'),
    path('myitems/cart/pay/', CartPayView.as_view(), name='cart_item_remove'),

]
