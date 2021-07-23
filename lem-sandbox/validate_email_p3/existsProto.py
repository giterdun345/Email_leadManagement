# using py3-validate-email not validate_email
from validate_email import validate_email

FROM_ADDRESS = ['johngk345@protonmail.com', 'lemmyem@gmail.com', 'lemmya345@protonmail.com', 'yesjohnny@protonmail.com']
is_valid = validate_email(email_address='gorgeuosG@sandhillangels.com', check_format=True, check_blacklist=True, check_dns=True, dns_timeout=20, check_smtp=True, smtp_timeout=20, smtp_helo_host= None, smtp_from_address='martinkett@protonmail.com', smtp_debug=True)
# OPTIONS 
# email_address='gorgeuosG@sandhillangels.com',
#  check_format=True, 
#  check_blacklist=True,
#   check_dns=True, 
#   dns_timeout=20, 
#   check_smtp=True, 
#   smtp_timeout=20, 
#   smtp_helo_host= None, 
#   smtp_from_address='martinkett@protonmail.com', 
#   smtp_debug=True)

print(is_valid)
print('Done')