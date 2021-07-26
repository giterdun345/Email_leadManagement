import requests
from bs4 import BeautifulSoup as bs
from random import choice
from proxybroker import Proxy

response = requests.get("http://sslproxies.org/", proxies={
  # 'https': 'https://51.159.154.37:3128',
  'http': 'http://5.252.161.48:8080'
  }) 

soup = bs(response.content, "html.parser")
table = soup.find('tbody') 
ips = table.select('tr > td')[::8]
ports = table.select('tr > td')[1::8]

complete_ip = []

for index in range(len(ips)):
  test = Proxy(host='5.252.161.48', port= 8080, timeout= 60)
  # test = Proxy(host=ips[index].contents[0], port=ports[index].contents[0], timeout=60)
  if test.is_working:
    complete_ip.append(ips[index].contents[0] + ':' + ports[index].contents[0])

proxies = {
      'http': 'http://' + choice(complete_ip),
      'https': 'https://' + choice(complete_ip)
    }

print(proxies)
