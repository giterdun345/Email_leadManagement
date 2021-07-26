import requests
from random import choice

targetData = [
  {
  "name": 'Brian Singerman',
  "domain": "foundersfund.com"
  },
  {
  "name": 'Byron Deeter',
  "domain": "bvp.com"
  },
  {
  "name": 'Hans Tung',
  "domain": "ggvc.com"
  },
  {
  "name": 'Manu Kumar',
  "domain": "divebar.com"
  },
  {
  "name": 'Michael Moritz',
  "domain": "crankstart.org"
  },
  {
  "name": 'Ravi Mhatre',
  "domain": "lsvp.com"
  }
]


def variation_list(target):
  """Outputs 8 variations to be used in testing if email exists, domain and
  full name are required from the uploaded input
  INPUT@DOMAIN tbd based on name input from user"""

  nameArr = target['name'].lower().split(' ')      
  atDomain = '@' + target['domain']
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
    # 10: 'info' + atDomain
  }

  return variationObj

address = []
for target in targetData:
  variationObj = variation_list(target)
  for email_address in variationObj.values():
    address.append(email_address)


email_address = choice(address)
new_proxy = '96.9.69.164:53281'

response = requests.get(
            "https://isitarealemail.com/api/email/validate",
            params = {'email': email_address},
            proxies= {
              'https': 'https://' + new_proxy
            }, 
            timeout= 300,
            headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Accept': '*/*', 
  }
          )

print('CODE %s' % response.status_code)
print('JSON %s' % response.json())

print('RESPONSE %s' % response)