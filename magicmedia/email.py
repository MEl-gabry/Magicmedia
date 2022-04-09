from djoser import email
from templated_mail.mail import BaseEmailMessage

class ActivationEmail(email.ActivationEmail):
    template_name = 'email/activation_email.html'

class ConfirmationEmail(BaseEmailMessage):
    template_name = 'email/confirmation_email.html'

class PasswordResetEmail(email.PasswordResetEmail):
    template_name = 'email/reset_password_email.html'

class ConfirmPasswordReset(BaseEmailMessage):
    template_name = 'email/password_changed_confirmation_email.html'