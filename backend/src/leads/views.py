"""View takes in a csv from client with full name, company and domain
This will put their full name and domain into ten different variations to 
see if an email exists. Slow but mimicks human behavior. Each check utilizes
a proxy to reduce risk of limit on RealEmail API. Proxy Scraper scrapes 100 fresh 
IP addresses and is rotated through out each email variation check."""
import json
from random import choice
from uuid import uuid4

import requests
import urllib3
from bs4 import BeautifulSoup as bs
from django.http import JsonResponse
from django.views import View
from django.views.generic.detail import SingleObjectMixin
from selenium import webdriver

from leads.caches import CheckEmailExistCache
from leads.tasks import check_email_exist_task

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

class ValidateView(SingleObjectMixin, View):
  """Accepts Full Name, Domain, and Email Address from uploadCSV.js
     Rotates proxies with 100 updated IP addresses and uses
     Real Email API; 
     LIMIT: checks up to 100 emails per day per ip address
     causing issues with max tries exceeded XXXXXXX
  """
  def post(self, request):
    tracking_id = uuid4()
    unicode_data = request.body.decode('utf-8')
    targetData = json.loads(unicode_data)
    proxies = scrape_proxies()
    # will return end results in JSON response to client

    index = 0
    for target in targetData:
      if target['name'] == '':
        print('Completed')
        break
      new_proxy = choice(proxies)
# problem with some firewall blocking the connections during the TLS handshake? 
# multi threading can be used for quicker performance
      check_email_exist_task.delay(tracking_id, index, target, new_proxy)  # Add celery task
      index += 1

    cache = CheckEmailExistCache(tracking_id)
    cache.set_total(index)

    return JsonResponse({
      'tracking_id': tracking_id,
      'total_task': index
    }, safe=False)


class ValidateProgressView(SingleObjectMixin, View):
  def post(self, request):
    tracking_key = request.body.decode('utf-8')

    cache = CheckEmailExistCache(tracking_key)
    total_task = cache.get_total()
    done_idx = cache.get_done_index()
    done = len(done_idx) if done_idx else 0
    result = cache.get_result() or []

    return JsonResponse({
      'progress': {
        'total': total_task,
        'done': done,
        'done_idx': done_idx or [],
      },
      'result': result,
    })
