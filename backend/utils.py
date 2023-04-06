# from kavenegar import *
#
#
# def send_otp_code(phone_number, code):
#
#     try:
#         print("yesssssssssssssssssssssssssssss")
#         api = KavenegarAPI('4A5063446D364565303742736C2B3443706E4B575A6671636F416941744670724F3457674B767557394B553D')
#         params = {
#             'sender': '',
#             'receptor': phone_number,
#             # 'message': f' رایجه گل ها را در امتداد مسیرت استشمام کن! \n کد تایید شما برای ثبت نام   '
#             'message': f'Green Garden \n !رایجه گل ها را در امتداد مسیرت استشمام کن \n :کد تایید برای ثبت نام \n {code}'
#         }
#         response = api.sms_send(params)
#         print('*********')
#         print(response)
#     except APIException as e:
#         print(e)
#     except HTTPException as e:
#         print(e)

from django.conf import settings
from django.core.mail import send_mail


def send_otp_code(name, email, code):
    subject = 'کد تایید ثبت نام در GG'
    message = f'« Green Garden » \n 🪴رایحه گیاهان را در امتداد مسیرت استشمام کن🪴 \n کد تایید ثبت نام شما: {code}'
    # message = f' رایحه گیاها را در امتداد مسیرت استشمام کن! \n کد تایید ثبت نام شما: {code}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email, ]
    response = send_mail(subject, message, email_from, recipient_list)