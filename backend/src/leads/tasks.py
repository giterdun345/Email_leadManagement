import requests
from celery import shared_task
from requests.adapters import HTTPAdapter
from urllib3.util import Retry

from leads.caches import CheckEmailExistCache
from leads.utils import variation_list

retry_strategy = Retry(
    total=10,
    status_forcelist=[429, 500, 502, 503, 504],
    method_whitelist=["HEAD", "GET", "OPTIONS"]
)
adapter = HTTPAdapter(max_retries=retry_strategy)
real_response = requests.Session()
real_response.mount("https://", adapter)
real_response.mount("http://", adapter)


@shared_task
def check_email_exist_task(tracking_id, index, target, new_proxy):
    variationObj = variation_list(target)
    end_results = []
    for email_address in variationObj.values():
        print('Checking: ' + email_address + ' with ' + new_proxy)

        try:
            response = real_response.get(
                "https://isitarealemail.com/api/email/validate",
                # REAL EMAIL WAS USED FOR THE ABILITY TO CHANGE PROXIES AND NOT TAINT ONES OWN IP ADDRESS
                params={'email': email_address},
                proxies={
                    'https': 'https://' + new_proxy
                },
                headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0',
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                    'Accept': '*/*',
                },
                timeout=20
            )
            print('Running....')
        except Exception as e:
            print('Exception')
        else:
            if response.status_code == 200:
                status = response.json()['status']
                # sleep(20)
                if status == "valid":
                    print("is valid: ", email_address)
                    if {
                        "name": target['name'],
                        "company": target['company'],
                        "category": target['category'],
                        "email": email_address,
                        "email_confirmed": True,
                    } not in end_results:
                        end_results.append({
                            "name": target['name'],
                            "company": target['company'],
                            "category": target['category'],
                            "email": email_address,
                            "email_confirmed": True,
                        })

                elif status == "invalid":
                    print("is invalid: ", email_address)
                    if {
                        "name": target['name'],
                        "company": target['company'],
                        "category": target['category'],
                        "email": ''
                    } not in end_results:
                        end_results.append({
                            "name": target['name'],
                            "company": target['company'],
                            "category": target['category'],
                            "email": ''
                        })

                else:
                    print("is unknown: ", email_address)
                    if {
                        "name": target['name'],
                        "company": target['company'],
                        "category": target['category'],
                        "email": ''
                    } not in end_results:
                        end_results.append({
                            "name": target['name'],
                            "company": target['company'],
                            "category": target['category'],
                            "email": ''
                        })
    # Save result into cache so we can return it with endpoint validation-progress
    CheckEmailExistCache(tracking_id).add_result(index, end_results)
    return end_results
