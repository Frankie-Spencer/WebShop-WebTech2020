from django.contrib.auth.hashers import make_password
import random
from django.shortcuts import render
from datetime import date, timedelta
from account.models import User
from shop_api.models import Item, CartItem, Payment


def main_page_states(request):
    n_users = User.objects.all().exclude(is_active=False).exclude(is_staff=True).count()
    n_items = Item.objects.all().count()
    last_week = date.today() - timedelta(days=7)
    n_items_last_week = Item.objects.filter(date_added__gte=last_week).count()

    context = {'n_users': n_users,
               'n_items': n_items,
               'n_items_last_week': n_items_last_week}

    if request == 'get_stats':
        return context

    else:
        return render(request, '../templates/shop/main.html', context)


def auto_db_populate(request, **kwargs):
    n_items = kwargs.get('ni')
    n_users = kwargs.get('nu')
    n_sellers = kwargs.get('ns')

    User.objects.all().exclude(is_superuser=True).delete()
    Item.objects.all().delete()
    CartItem.objects.all().delete()
    Payment.objects.all().delete()

    for n_u in range(1, n_users + 1):
        User.objects.create(email='testuser' + str(n_u) + '@shop.aa',
                            user_name='testuser' + str(n_u),
                            first_name='testuser' + str(n_u) + 'first_name',
                            password=make_password('pass' + str(n_u)))

    all_users = User.objects.all()
    all_users_ids = [i.id for i in all_users][:n_sellers]

    item_num = 1
    for uid in all_users_ids:
        user = User.objects.get(pk=uid)
        for i in range(1, n_items + 1):
            Item.objects.create(user=user,
                                title='test_item_' + str(item_num),
                                description=str('test_item_' + str(item_num) + ' ') * 12,
                                price=item_num * 10,
                                buyer=None,
                                status='available')
            item_num += 1

    context = {'db_message': 'Database items Generated!'}

    stats = main_page_states('get_stats')
    context.update(stats)

    return render(request, '../templates/shop/main.html', context)


def auto_db_populate_random(request, **kwargs):
    n_items = kwargs.get('ni')
    n_users = kwargs.get('nu')
    n_sellers = kwargs.get('ns')

    User.objects.all().exclude(is_superuser=True).delete()
    Item.objects.all().delete()
    CartItem.objects.all().delete()
    Payment.objects.all().delete()

    for n_u in range(1, n_users + 1):
        User.objects.create(email='testuser' + str(n_u) + '@shop.aa',
                            user_name='testuser' + str(n_u),
                            first_name='testuser' + str(n_u) + 'first_name',
                            password=make_password('pass' + str(n_u)))

    all_users = User.objects.all()
    all_users_ids = [i.id for i in all_users if not i.is_superuser]

    rc = list(range(1, 101))

    for i in range(1, int(n_items / 2) + 1):
        rand_id = random.sample(all_users_ids, 2)
        user = User.objects.get(pk=rand_id[0])
        buyer = User.objects.get(pk=rand_id[1])

        n = random.choice(rc)
        rc.remove(n)

        Item.objects.create(user=user,
                            title='test_item_' + str(n),
                            description=str('test_item_' + str(n) + ' ') * 12,
                            price=i * 10,
                            buyer=None,
                            status='available')

        n = random.choice(rc)
        rc.remove(n)

        Item.objects.create(user=user,
                            title='test_item_' + str(n),
                            description=str('test_item_' + str(n) + ' ') * 12,
                            price=i * 10,
                            buyer=buyer,
                            status='sold')
