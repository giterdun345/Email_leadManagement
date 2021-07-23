from selenium import webdriver
from selenium.webdriver.common.by import By
# allows access to keyboard keys 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions

import time

PATH = 'C:\Program Files (x86)/chromedriver.exe'

driver = webdriver.Chrome(PATH)

driver.get('https://auth.nfx.com/login?state=hKFo2SBxeGxWUjlDSUpyV29kSGhyc3lMM3d1T0h1UnZ2R1AtYaFupWxvZ2luo3RpZNkgTnlrRV9LRXJOWm92SjVGRGI3RUZuOFVERk9KOXZqMDajY2lk2SBWaTJFd28wblc2ZmxLUXpPME5CYzhFMFl2ZUJqaktsVQ&client=Vi2Ewo0nW6flKQzO0NBc8E0YveBjjKlU&protocol=oauth2&audience=https%3A%2F%2Fnfxsignal-production.auth0.com%2Fapi%2Fv2%2F&scope=openid%20email%20profile&response_type=token%20id_token&redirect_uri=https%3A%2F%2Fsignal.nfx.com%2Flogin&connection=username-password&login_hint=&connection_scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.metadata&access_type=offline&nonce=QQC.uNugsqtA7A37PESQd0~QT35rY.a.&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4xMC4xIn0%3D')

# driver.findElement(By.ID, "switch-to-login").click()
driver.find_element_by_id("switch-to-login").click()

# Enter login info 
time.sleep(2)
email = driver.find_element_by_id("email")
email.send_keys("yes_johnny@protonmail.com")
time.sleep(1)
password = driver.find_element_by_id("password")
password.send_keys("Yj21460519@@")

driver.find_element_by_id("btn-login").click()
time.sleep(2)
driver.refresh()
time.sleep(5)

while True:
  try: 
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight)") 
    time.sleep(3)
    driver.find_element_by_xpath("//*[@id='table-wrapper']/div/div[1]/div/div[3]/div/div/button").click()
    # //*[@id="table-wrapper"]/div/div[1]/div/div[3]/div/div/button
    # changes div[3] often 
    time.sleep(20)

  except:
    print("No more LOAD MORE RESULTS button to be clicked")
    break

links = driver.find_elements_by_xpath("//*[@id='table-wrapper']/div/div/div/div/div/div/div/div/a")

saved_links = []

for link in links:
    href = link.get_attribute('href')
    saved_links.append(href)

# print(saved_links.length)

f=open('saved_links.txt','w')
for ele in saved_links:
    f.write(ele+'\n')

f.close()




