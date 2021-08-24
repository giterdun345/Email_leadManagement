import requests
from bs4 import BeautifulSoup as bs
from random import choice

# from selenium import webdriver

# PATH = 'C:\Program Files (x86)/chromedriver.exe'

# driver = webdriver.Chrome(PATH)

# driver.get('https://auth.nfx.com/login?state=hKFo2SBxeGxWUjlDSUpyV29kSGhyc3lMM3d1T0h1UnZ2R1AtYaFupWxvZ2luo3RpZNkgTnlrRV9LRXJOWm92SjVGRGI3RUZuOFVERk9KOXZqMDajY2lk2SBWaTJFd28wblc2ZmxLUXpPME5CYzhFMFl2ZUJqaktsVQ&client=Vi2Ewo0nW6flKQzO0NBc8E0YveBjjKlU&protocol=oauth2&audience=https%3A%2F%2Fnfxsignal-production.auth0.com%2Fapi%2Fv2%2F&scope=openid%20email%20profile&response_type=token%20id_token&redirect_uri=https%3A%2F%2Fsignal.nfx.com%2Flogin&connection=username-password&login_hint=&connection_scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.metadata&access_type=offline&nonce=QQC.uNugsqtA7A37PESQd0~QT35rY.a.&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4xMC4xIn0%3D')
def proxy_scraper():
  response = requests.get("http://sslproxies.org/") 

  soup = bs(response.content, "html.parser")
  table = soup.find('tbody') 
  ips = table.select('tr > td')[::8]
  ports = table.select('tr > td')[1::8]

  complete_ip = []
  for index in range(len(ips)):
    complete_ip.append(ips[index].contents[0] + ':' + ports[index].contents[0])

  proxies = {
        'http': 'http://' + choice(complete_ip),
        'https': 'https://' + choice(complete_ip)
      }

  return complete_ip
  # print(proxies)

