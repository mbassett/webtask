#/bin/env python
import requests
import time

webtaskurl = 'https://webtask.it.auth0.com/api/run/wt-mbassett_jr-gmail_com-0/netcat?webtask_no_cache=1&host=50.46.217.206&port=9999'
keepaliveurl = 'https://webtask.it.auth0.com/api/run/wt-mbassett_jr-gmail_com-0/netcat?webtask_no_cache=1'


def tickle(url):
    print 'making request to {}'.format(url)
    r = requests.get(url)
    time.sleep( 25 )
    tickle(url)

if __name__ == "__main__":
    r = requests.get(webtaskurl)
    tickle(keepaliveurl)
