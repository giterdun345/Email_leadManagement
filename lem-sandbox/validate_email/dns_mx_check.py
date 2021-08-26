import dns.resolver, smtplib

# email = 'lan.zhu@creadev.com'
# domain = email.split('@')[1]
# answers = dns.resolver.resolve(domain,'NS')
# for server in answers:
#     print(server.target)


# records = dns.resolver.resolve(domain, 'MX')
# mxRecord = records[0].exchange
# print(mxRecord)
# mxRecord = str(mxRecord)
# print(mxRecord)

# server = smtplib.SMTP()
# server.set_debuglevel(0)
# server.connect(mxRecord)
# server.helo(server.local_hostname) 
# server.mail('abc@bt.com')
# code, message = server.rcpt(str(email))
# print(message)
# print(code)

# server.quit()


MyEmail = 'lemmyem345@hotmail.com'
MyPassword = 'Qwerty123!!'
EmailToValidate = ''

record = dns.resolver.resolve(str.split(EmailToValidate, "@")[1], "MX")
mx = str(record[0].exchange)

server = smtplib.SMTP("smtp.live.com", 587)
# server = smtplib.SMTP("smtp.live.com", source_address=("'96.9.69.164", 25)) FAILS 
server.set_debuglevel(1)
server.ehlo()
server.starttls() 
server.ehlo(server.local_hostname)
server.login(MyEmail, MyPassword)
server.helo("live.com")
server.connect(mx)
server.verify(EmailToValidate)
server.helo("live.com")# failing at this point
server.mail(MyEmail) # failing at this point

code, msg = server.rcpt(EmailToValidate)
print("Code: ", str(code), " message: ", msg)

# (250, OK) if the email exists, and (550, Address Rejected