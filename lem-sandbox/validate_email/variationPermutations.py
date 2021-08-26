from validate_email import validate_email
import random 

FROM_ADDRESS = ['johngk345@protonmail.com', 'lemmyem@gmail.com', 'lemmya345@protonmail.com', 'yesjohnny@protonmail.com']
# name = input()
name = 'Samson Mesele'
domain = 'usv.com'

nameArr = name.lower().split()
atDomain = '@' + domain
# combined no seperator 
firstVariation = ''.join(nameArr) + atDomain
# combined seperator as dot  
secondVariation = '.'.join(nameArr) + atDomain
# reverse lname fname 
thirdVariation = ''.join(nameArr[::-1]) + atDomain
# reverse lname fname with dot 
fourthVariation = '.'.join(nameArr[::-1]) + atDomain
# fname first letter with lastname 
fnameLetter = nameArr[0][0]
fifthVariation = fnameLetter + nameArr[1] + atDomain
# fname letter with lastname dot seperated 
sixthVariation = fnameLetter + '.' + nameArr[1] + atDomain
# lname letter with fname 
lnameLetter = nameArr[1][0]
seventhVariation = lnameLetter + nameArr[0] + atDomain
# lname letter with fname with dot seperator
eigthVariation = lnameLetter + '.' + nameArr[0] + atDomain
ninthVariation = nameArr[0] + atDomain

variationObj= {
  1: firstVariation,
  2: secondVariation, 
  3: thirdVariation,
  4: fourthVariation,
  5: fifthVariation,
  6: sixthVariation,
  7: seventhVariation,
  8: eigthVariation,
  9: ninthVariation, 
  10: 'info' + atDomain
}

emails = []

for variation in variationObj.values():
  print('Checking: ' + variation)
  is_valid = validate_email(
        email_address=variation,
        check_format=False, 
        check_blacklist=False, 
        check_dns=True, 
        dns_timeout=20, 
        check_smtp=True, 
        smtp_timeout=200, 
        smtp_helo_host= None, 
        smtp_from_address='lemmyem345@gmail.com', 
        smtp_debug=False
        )
  if is_valid:
    emails.append(variation)
    print('Found ', variation)

  print('Done checking ' + variation)

print (emails)