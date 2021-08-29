def variation_list(target):
  """Outputs 8 variations to be used in testing if email exists, domain and
  full name are required from the uploaded input
  INPUT@DOMAIN tbd based on name input into the db"""

  nameArr = target['name'].lower().split(' ')
  atDomain = '@' + target['domain']
  # 1st combined no seperator
  firstVariation = ''.join(nameArr) + atDomain
  # 2nd combined seperator as dot
  secondVariation = '.'.join(nameArr) + atDomain
  # 3rd reverse lname fname
  thirdVariation = ''.join(nameArr[::-1]) + atDomain
  # 4th reverse lname fname with dot
  fourthVariation = '.'.join(nameArr[::-1]) + atDomain
  # 5th fname first letter with lastname
  fnameLetter = nameArr[0][0]
  fifthVariation = fnameLetter + nameArr[1] + atDomain
  # 6th fname letter with lastname dot seperated
  sixthVariation = fnameLetter + '.' + nameArr[1] + atDomain
  # 7th lname letter with fname
  lnameLetter = nameArr[1][0]
  seventhVariation = lnameLetter + nameArr[0] + atDomain
  # 8th lname letter with fname with dot seperator
  eigthVariation = lnameLetter + '.' + nameArr[0] + atDomain
  # 9th variation if all else fails info@domain can be used if it exists
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
    10: 'info' + atDomain
  }

  return variationObj
