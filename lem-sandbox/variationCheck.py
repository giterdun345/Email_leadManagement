from validate_email import validate_email


is_valid = validate_email(email_address='mgargenta@sandhillangels.com', check_format=True, check_blacklist=True, check_dns=True, dns_timeout=20, check_smtp=True, smtp_timeout=20, smtp_helo_host= None, smtp_from_address='martinkett@protonmail.com', smtp_debug=True)

print(is_valid)