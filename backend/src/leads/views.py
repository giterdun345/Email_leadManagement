from django.views import View
from django.http import JsonResponse
from django.views.generic.detail import SingleObjectMixin
import json
from validate_email import validate_email
import random 

FROM_ADDRESS = ['johngk345@protonmail.com', 'lemmyem@gmail.com', 'lemmya345@protonmail.com', 'yesjohnny@protonmail.com']

class ValidateView(SingleObjectMixin, View):
  def post(self, request):
    unicode_data = request.body.decode('utf-8')
    targetData = json.loads(unicode_data)

    end_results = []

    for target in targetData:
      if target['name'] == '':
        break
      nameArr = target['name'].lower().split(' ')
      print(nameArr)
      
      atDomain = '@' + target['domain']
      # combined no seperator 
      firstVariation = ''.join(nameArr) + atDomain
      # combined seperator as dot  
      secondVariation = '.'.join(nameArr) + atDomain
      # reverse lname fname 
      thirdVariation = ''.join(nameArr[::-1]) + atDomain
      # reverse lname fname with dot 
      fourthVariation = '.'.join(nameArr[::-1]) + atDomain
      # fname first letter with lastname 
      fnameLetter = nameArr[0][0]
      fifthVariation = fnameLetter + nameArr[1] + atDomain
      # fname letter with lastname dot seperated 
      sixthVariation = fnameLetter + '.' + nameArr[1] + atDomain
      # lname letter with fname 
      lnameLetter = nameArr[1][0]
      seventhVariation = lnameLetter + nameArr[0] + atDomain
      # lname letter with fname with dot seperator
      eigthVariation = lnameLetter + '.' + nameArr[0] + atDomain
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
        # 10: 'info' + atDomain
      }


      for variation in variationObj.values():
        print('Checking: ' + variation)
        is_valid = validate_email(
              email_address=variation,
              check_format=False, 
              check_blacklist=False, 
              check_dns=False, 
              dns_timeout=200, 
              check_smtp=True, 
              smtp_timeout=200, 
              smtp_helo_host= None, 
              smtp_from_address=random.choice(FROM_ADDRESS), 
              smtp_debug=False
              )
        print('go')

        if is_valid:
          global email
          email= variation[0]
          # print('Found ', variation)

        print('Done checking ' + variation)
        if target not in end_results:
          end_results.append({
            "name":     target['name'],
            "company":  target['company'],
            "category": target['category'],
            "email":    email,
            # "personal": target['personal'],
            # "twitter":  target['twitter'],
            # "linkedin": target['linkedin'],
            # "angel":    target['angel'],
            # "crunchbase": target['crunchbase']
          })
        
    return JsonResponse(end_results, safe= False)


