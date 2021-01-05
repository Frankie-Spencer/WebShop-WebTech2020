from django.core.mail import send_mass_mail


def send_email(buyer_email, buyer_user_name, seller_dic):

    standard_msg_dic = {'to_buyer': {'msg_start': 'Hello!\n' 
                                                  'You have bought the following item(s).\n\n',
                                     'msg_end': 'Thank you for using WebShop!\n'
                                                'Regards,\n'
                                                'WebShopTeam'},

                        'to_seller': {'msg_start': 'Hello!\n'
                                                   'You have sold the following item(s).\n\n',
                                      'msg_end': 'Thank you for using WebShop!\n'
                                                 'Regards,\n'
                                                 'WebShopTeam'}}

    buyer_email_body_dic = {buyer_email: standard_msg_dic['to_buyer']['msg_start']}
    for seller in seller_dic:
        for item in seller_dic[seller]:
            item_info = '{} for {}€ from {}\n'.format(item['item'],
                                                      item['price'],
                                                      item['seller'])
            buyer_email_body_dic[buyer_email] += item_info

    buyer_email_body_dic[buyer_email] += '\n'
    buyer_email_body_dic[buyer_email] += standard_msg_dic['to_buyer']['msg_end']

    sellers_email_body_dic = {}
    for seller in seller_dic:
        sellers_email_body_dic.update({seller: standard_msg_dic['to_seller']['msg_start']})
        for item in seller_dic[seller]:
            item_info = '{} for {}€ to {}\n'.format(item['item'],
                                                    item['price'],
                                                    buyer_user_name)

            sellers_email_body_dic[seller] += item_info

        sellers_email_body_dic[seller] += '\n'
        sellers_email_body_dic[seller] += standard_msg_dic['to_seller']['msg_end']

    mass_email_list = []
    to_buyer = ['WebShop transaction notification',
                buyer_email_body_dic[buyer_email],
                '',
                [buyer_email]]

    mass_email_list.append(to_buyer)

    for seller in sellers_email_body_dic:
        to_seller = ['WebShop transaction notification',
                     sellers_email_body_dic[seller],
                     '',
                     [seller]]

        mass_email_list.append(to_seller)

    send_mass_mail(mass_email_list)
