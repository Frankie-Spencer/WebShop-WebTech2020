from django.db import models
from django.conf import settings


class Item(models.Model):

    item_status_options = (('available', 'Available'),
                           ('sold', 'Sold'))

    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    date_added = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE,
                             related_name='shop_items_sell')

    buyer = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.DO_NOTHING,
                              related_name='shop_items_bought',
                              null=True,
                              blank=True)

    status = models.CharField(max_length=10,
                              choices=item_status_options,
                              default='available')

    objects = models.Manager()

    class Meta:
        ordering = ('-date_added',)

    def __str__(self):
        return self.title


class CartItem(models.Model):

    cart_item_status_options = (('', 'Original'),
                                ('price changed', 'Price changed'),
                                ('item not available', 'Item not available'))

    item = models.ForeignKey(Item,
                             on_delete=models.SET_NULL,
                             null=True)

    item_code = models.IntegerField()
    title = models.CharField(max_length=100)
    description = models.TextField(null=True)
    current_price = models.FloatField(null=True)
    date_added = models.DateTimeField(auto_now=True)
    client = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE,
                               related_name='shop_items_buy')

    status = models.CharField(max_length=18,
                              choices=cart_item_status_options,
                              default='',
                              blank=True)

    class Meta:
        ordering = ('-date_added',)

    def __str__(self):
        return self.title

    def get_current_sum(self):
        cart_items = CartItem.objects.filter(client=self.client)
        current_sum = sum([item.current_price for item in cart_items])
        return current_sum

    def save(self, *args, **kwargs):
        users_cart_item = Cart.objects.filter(user=self.client).first()
        users_cart_item.price_total = self.get_current_sum() + self.current_price
        users_cart_item.save()
        super(CartItem, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        users_cart_item = Cart.objects.filter(user=self.client).first()
        users_cart_item.price_total = self.get_current_sum() - self.current_price
        users_cart_item.save()
        super(CartItem, self).save(*args, **kwargs)
        models.Model.delete(self)


class Cart(models.Model):

    cart_item_status_options = (('pay', 'Pay'),
                                ('not paid', 'Not paid'))

    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    items = models.ManyToManyField(CartItem,
                                   blank=True)

    start_date = models.DateTimeField(auto_now_add=True)
    price_total = models.FloatField(default=0)

    pay_confirm = models.CharField(max_length=15,
                                   choices=cart_item_status_options,
                                   default='not paid')

    def __str__(self):
        return self.user.user_name


class Payment(models.Model):
    cart_item_status_options = (('confirmed', 'Confirmed'),
                                ('not confirmed', 'Not confirmed'))

    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    cart_items = models.JSONField()
    payment_status = models.CharField(max_length=15,
                                      choices=cart_item_status_options,
                                      default='not confirmed',
                                      blank=True)

    payment_total = models.FloatField(default=0)
    date_paid = models.DateTimeField(auto_now=True)
