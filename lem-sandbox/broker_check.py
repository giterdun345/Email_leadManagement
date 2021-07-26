"""Find 10 working HTTP(S) proxies and save them to a file."""

import asyncio
from proxybroker import Broker, Proxy

# Proxy(host=None, port=None, types=(), timeout=8, verify_ssl=False)
test = Proxy(host='111.249.179.2', 
port='3128', 
timeout=60)
print(test.is_working)
# asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# async def save(proxies, filename):
#     """Save proxies to a file."""
#     with open(filename, 'w') as f:
#         while True:
#             proxy = await proxies.get()
#             if proxy is None:
#                 break
#             proto = 'https' if 'HTTPS' in proxy.types else 'http'
#             row = '%s://%s:%d\n' % (proto, proxy.host, proxy.port)
#             f.write(row)


# def main():
#     proxies = asyncio.Queue()
#     broker = Broker(proxies)
#     tasks = asyncio.gather(broker.find(types=['HTTP', 'HTTPS'], limit=10),
#                            save(proxies, filename='proxies.txt'))
#     loop = asyncio.get_event_loop()
#     loop.run_until_complete(tasks)


# if __name__ == '__main__':
#     main()

# async def check():
  # broker = Broker()
  # await broker.find(types=['HTTP', 'HTTPS'], limit= 10, judges=['https://google.com'])
  
  
# check()