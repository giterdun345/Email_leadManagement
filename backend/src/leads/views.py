"""View takes in a csv from client with full name, company and domain
This will put their full name and domain into ten different variations to 
see if an email exists. Slow but mimicks human behavior. Each check utilizes
a proxy to reduce risk of limit on RealEmail API. Proxy Scraper scrapes 100 fresh 
IP addresses and is rotated through out each email variation check."""

import requests
from bs4 import BeautifulSoup as bs
from random import choice

from django.views import View
from django.http import JsonResponse
from django.views.generic.detail import SingleObjectMixin
import json
from selenium import webdriver
from time import sleep
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
 
from requests.adapters import HTTPAdapter
from urllib3.util import Retry

# CONFIGURATION for realEmail GET requests 
retry_strategy = Retry(
    total=10,
    status_forcelist=[429, 500, 502, 503, 504],
    method_whitelist=["HEAD", "GET", "OPTIONS"]
)
adapter = HTTPAdapter(max_retries=retry_strategy)
real_response = requests.Session()
real_response.mount("https://", adapter)
real_response.mount("http://", adapter)

def scrape_proxies():
  """SCRAPES PROXIES FROM SITE USING SELENIUM TO GET PAST 
      THE THREAT DETECTION BLOCKED LANDING PAGE 
      IMPORTANT: MUST OBTAIN COOKIE BY CLICKING APPROVE IN WEBDRIVER 
      AND RERUN VALIDATION; WORKAROUND TODO"""  
      # path to be changed for deployment
  PATH = 'C:\Program Files (x86)/chromedriver.exe'

  options = webdriver.ChromeOptions()
  options.add_argument('--ignore-certificate-errors-spki-list')
  options.add_argument('--ignore-certificate-errors')
  options.add_argument('--ignore-ssl-errors')
  driver = webdriver.Chrome(PATH, chrome_options=options)

  driver.get("http://sslproxies.org/")
  soup = bs(driver.page_source, 'lxml')
  table = soup.find('tbody')  
  ips = table.select('tr > td')[::8]
  ports = table.select('tr > td')[1::8]
  driver.close()

  complete_ip = []
  
  for index in range(len(ips)):
    complete_ip.append(ips[index].contents[0] + ':' + ports[index].contents[0])
  
  print('Proxy Scraping Completed')
  return complete_ip  


def scrape_proxies_requests():
  """Obtains 100 updated proxies to be used for testing if email exists using 
  the requests library. Landing page for threat detection blocked causes error
  """
  headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Accept': '*/*', 
    'Connection': 'keep-alive'
  }

  response = requests.get("http://sslproxies.org/", headers=headers, verify=False) 
  soup = bs(response.content, "html.parser")
  table = soup.find('tbody')  
  ips = table.select('tr > td')[::8]
  ports = table.select('tr > td')[1::8]
  
  # DEFAULT IP ADDRESSES LAST CHECKED 28-07-21
  complete_ip = ['http://5.252.161.48:8080', '161.117.234.195:8118']
  
  for index in range(len(ips)):
    # create a list of scraped proxies for rotation 
    complete_ip.append(ips[index].contents[0] + ':' + ports[index].contents[0])
  
  return complete_ip

def variation_list(target):
  """Outputs 8 variations to be used in testing if email exists, domain and
  full name are required from the uploaded input
  INPUT@DOMAIN tbd based on name input into the db"""

  nameArr = target['name'].lower().split(' ')      
  atDomain = '@' + target['domain']
  # 1st combined no seperator 
  firstVariation = ''.join(nameArr) + atDomain
  # 2nd combined seperator as dot  
  secondVariation = '.'.join(nameArr) + atDomain
  # 3rd reverse lname fname 
  thirdVariation = ''.join(nameArr[::-1]) + atDomain
  # 4th reverse lname fname with dot 
  fourthVariation = '.'.join(nameArr[::-1]) + atDomain
  # 5th fname first letter with lastname 
  fnameLetter = nameArr[0][0]
  fifthVariation = fnameLetter + nameArr[1] + atDomain
  # 6th fname letter with lastname dot seperated 
  sixthVariation = fnameLetter + '.' + nameArr[1] + atDomain
  # 7th lname letter with fname 
  lnameLetter = nameArr[1][0]
  seventhVariation = lnameLetter + nameArr[0] + atDomain
  # 8th lname letter with fname with dot seperator
  eigthVariation = lnameLetter + '.' + nameArr[0] + atDomain
  # 9th variation if all else fails info@domain can be used if it exists
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

  return variationObj

class ValidateView(SingleObjectMixin, View):
  """Accepts Full Name, Domain, and Email Address from uploadCSV.js
     Rotates proxies with 100 updated IP addresses and uses
     Real Email API; 
     LIMIT: checks up to 100 emails per day per ip address
     causing issues with max tries exceeded XXXXXXX
  """
  def post(self, request):
    unicode_data = request.body.decode('utf-8')
    targetData = json.loads(unicode_data)
    proxies = scrape_proxies()
    # will return end results in JSON response to client 
    end_results = []

    for target in targetData:
      if target['name'] == '':
        print('Completed')
        break

# problem with some firewall blocking the connections during the TLS handshake? 
# multi threading can be used for quicker performance
      variationObj = variation_list(target)
      for email_address in variationObj.values():
        # make requests to real email import requests
        running_check = True
        while running_check: 
          new_proxy = choice(proxies)
          print('Checking: ' + email_address + ' with ' + new_proxy)

          try:
            response = real_response.get(
            "https://isitarealemail.com/api/email/validate",
            params = {'email': email_address},
            proxies= {
              'https': 'https://' + new_proxy
            }, 
            headers = {
              'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0',
              'Referrer-Policy': 'strict-origin-when-cross-origin',
              'Accept': '*/*', 
            },
            timeout= 20
            )
            print('Running....')
          except:
            print('Excepted')
            running_check = False


          if response.status_code == 200:
            status = response.json()['status']
            # sleep(20)
            if status == "valid":
              print("is valid: ", email_address)
              if { 
                  "name":     target['name'],
                  "company":  target['company'],
                  "category": target['category'],
                  "email":    email_address,
                  "email_confirmed": True,
                 } not in end_results: 
                end_results.append({ 
                  "name":     target['name'],
                  "company":  target['company'],
                  "category": target['category'],
                  "email":    email_address,
                  "email_confirmed": True,
              })
              running_check = False

            elif status == "invalid":
              print("is invalid: ", email_address)
              if { 
                  "name":     target['name'],
                  "company":  target['company'],
                  "category": target['category'],
                  "email":    ''
              } not in end_results:
                  end_results.append({ 
                  "name":     target['name'],
                  "company":  target['company'],
                  "category": target['category'],
                  "email":    ''
                  })
              running_check = False

            else:
              print("is unknown: ", email_address)
              if { 
                  "name":     target['name'],
                  "company":  target['company'],
                  "category": target['category'],
                  "email":    ''
              } not in end_results:
                  end_results.append({ 
                  "name":     target['name'],
                  "company":  target['company'],
                  "category": target['category'],
                  "email":    ''
                  })
              running_check = False

        sleep(5)

    print(end_results)
    return JsonResponse(end_results, safe= False)