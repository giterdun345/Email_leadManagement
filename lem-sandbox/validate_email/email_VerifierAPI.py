import requests

url = "https://email-checker.p.rapidapi.com/verify/v1"
# $0.02 after 100 
querystring = {"email":"growth@insightpartners.com"}

headers = {
    'x-rapidapi-host': "email-checker.p.rapidapi.com",
    'x-rapidapi-key': ""
    }

response = requests.request("GET", url, headers=headers, params=querystring, )

print(response.text)

# response = real_response.get(
#             "https://isitarealemail.com/api/email/validate",
#             # REAL EMAIL WAS USED FOR THE ABILITY TO CHANGE PROXIES AND NOT TAINT ONES OWN IP ADDRESS 
#             params = {'email': email_address},
#             proxies= {
#               'https': 'https://' + new_proxy
#             }, 
#             headers = {
#               'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0',
#               'Referrer-Policy': 'strict-origin-when-cross-origin',
#               'Accept': '*/*', 
#             },
#             timeout= 20
#             )
#             print('Running....')