# import requests 
# from random import choice
# import requests
# from bs4 import BeautifulSoup as bs
from selenium import webdriver
import time

PATH = 'C:\Program Files (x86)/chromedriver.exe'
# caps = webdriver.DesiredCapabilities.CHROME.copy()
# caps['acceptInsecureCerts'] = True
# caps['acceptSslCerts'] = True
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors-spki-list')
options.add_argument('--ignore-certificate-errors')
options.add_argument('--ignore-ssl-errors')
driver = webdriver.Chrome(PATH, chrome_options=options)


# driver = webdriver.Chrome(desired_capabilities=caps)


driver.get("http://sslproxies.org/")

time(2)

# driver.find_element_by_id('unsafe').click()

time(2)

try:
  driver.execute_script("window.scrollTo(0, document.body.scrollHeight)") 
except:
  print('nada')

ip_with_port = []

def iterate_table():
  # "https://sslproxies.org/"
# TABLE: /html/body/div/main/div/div[2]/div/table/tbody/tr[1]
# IP COLUMN: : /html/body/div/main/div/div[2]/div/table/tbody/tr[1]/td[1]
# PORT COLUMN: /html/body/div/main/div/div[2]/div/table/tbody/tr[1]/td[2]

  for row_number in range(1, 27):
    ip = driver.find_element_by_xpath("/html/body/div/main/div/div[2]/div/table/tbody/tr[row_number]/td[1]")
    port = driver.find_element_by_xpath("/html/body/div/main/div/div[2]/div/table/tbody/tr[row_number]/td[2]")
    ip_with_port.append(ip + ':' + port)

iterate_table()

time(2)

driver.find_element_by_id('btn2').click()

time(5)

iterate_table()

f=open('saved_proxies.txt','w')
for ele in ip_with_port:
    f.write(ele+'\n')

f.close()




