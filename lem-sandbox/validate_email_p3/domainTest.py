import dns.resolver

# domain = 'protonmail.com'
# arr = dns.resolver.resolve(domain, 'MX')
# print(len(arr))
# for x in dns.resolver.resolve(domain, 'MX'):
#   print(x)

domain = 'onelionheart.com'
answers = dns.resolver.query(domain,'NS')
for server in answers:
    print(server.target)