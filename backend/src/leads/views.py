import requests
from bs4 import BeautifulSoup as bs
from random import choice

from django.views import View
from django.http import JsonResponse
from django.views.generic.detail import SingleObjectMixin
import json
import urllib3

urllib3.disable_warnings()

def scrape_proxies():
  """Obtains 100 updated proxies to be used for testing if email exists"""
  response = requests.get("http://sslproxies.org/", verify=False) 

  soup = bs(response.content, "html.parser")
  table = soup.find('tbody') 
  ips = table.select('tr > td')[::8]
  ports = table.select('tr > td')[1::8]

  complete_ip = []
  for index in range(len(ips)):
    complete_ip.append(ips[index].contents[0] + ':' + ports[index].contents[0])
  
  return complete_ip


def variation_list(target):
  """Outputs 8 variations to be used in testing if email exists, domain and
  full name are required from the uploaded input
  INPUT@DOMAIN tbd based on name input into the db"""

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

class ValidateView(SingleObjectMixin, View):
  """Accepts Full Name, Domain, and Email Address from uploadCSV.js
     Rotates proxies with 100 updated IP addresses and uses
     Real Email API; 
     LIMIT: checks up to 100 emails per day per ip address
  """
  def post(self, request):
    unicode_data = request.body.decode('utf-8')
    targetData = json.loads(unicode_data)
    proxy_list = scrape_proxies()
    # proxies to make request to Real Email
    proxies = {
      'http': proxy_list.choice(),
      'https': proxy_list.choice()
    }
    # end results to be returned to user 
    end_results = []

    for target in targetData:
      if target['name'] == '':
        print('Completed')
        break

      variationObj = variation_list(target)
      for email_address in variationObj.values():
        # make requests to real email import requests
        response = requests.get(
          "https://isitarealemail.com/api/email/validate",
          params = {'email': email_address},
          proxies= proxies
        )

        status = response.json()['status']
        if status == "valid":
          print("email is valid")
          end_results.append({ 
              "name":     target['name'],
              "company":  target['company'],
              "category": target['category'],
              "email":    email_address
          })

        elif status == "invalid":
          print("email is invalid")
          end_results.append({ 
              "name":     target['name'],
              "company":  target['company'],
              "category": target['category'],
              "email":    ''
          })

        else:
          print("email was unknown")
          end_results.append({ 
              "name":     target['name'],
              "company":  target['company'],
              "category": target['category'],
              "email":    ''
          })

    print(end_results)
    return JsonResponse(end_results, safe= False)


