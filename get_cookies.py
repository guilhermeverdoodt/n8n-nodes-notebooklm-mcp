import json

with open('cookies.json') as f:
    cookies = json.load(f)

seen = {}
for c in cookies:
    if 'google.com' in c.get('domain', '') and c['name'] not in seen:
        seen[c['name']] = c['value']

cookie_str = '; '.join(f"{k}={v}" for k, v in seen.items())
print(cookie_str)
