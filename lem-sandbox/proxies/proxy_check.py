import requests
from selenium import webdriver
from bs4 import BeautifulSoup as bs
from random import choice
import os
os.environ['no_proxy'] = '*' 

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Accept': '*/*', 
    'Connection': 'keep-alive'
  }

def scrape_proxies_requests():
  """Obtains 100 updated proxies to be used for testing if email exists"""
  response = requests.get("http://sslproxies.org/", headers=headers, verify=False, proxies={
  # 'https': 'https://51.159.154.37:3128',
  'http': 'http://5.252.161.48:8080'
  }) 

  soup = bs(response.content, "html.parser")
  table = soup.find('tbody')  
  ips = table.select('tr > td')[::8]
  ports = table.select('tr > td')[1::8]
  
  complete_ip = ['http://5.252.161.48:8080']
  
  for index in range(len(ips)):
    complete_ip.append(ips[index].contents[0] + ':' + ports[index].contents[0])
  
  return complete_ip

def scrape_proxies():
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
  
  complete_ip = []
  
  for index in range(len(ips)):
    complete_ip.append(ips[index].contents[0] + ':' + ports[index].contents[0])
  
  return complete_ip  


proxies = scrape_proxies()
checker = True
while checker:
  new_proxy = choice(proxies)
  print('Checking...' + new_proxy)
  r = requests.get('https://www.google.com', headers = headers, proxies= {
            'http': 'http://' + new_proxy,
          },)
  if r.status_code == 200:
    checker = False
    print('Found: ' + new_proxy)
    
