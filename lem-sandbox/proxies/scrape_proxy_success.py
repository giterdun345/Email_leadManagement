import requests
from bs4 import BeautifulSoup as bs
from random import choice

response = requests.get("http://sslproxies.org/") 
soup = bs(response.content, "html.parser")
table = soup.find('tbody') 
ips = table.select('tr > td')[::8]
ports = table.select('tr > td')[1::8]

complete_ip = []
for index in range(len(ips)):
  complete_ip.append(ips[index].contents[0] + ':' + ports[index].contents[0])

proxies = {
      'http': complete_ip.choice(),
      'https': complete_ip.choice()
    }
# print(complete_ip)

