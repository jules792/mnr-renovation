from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re
root=Path(__file__).parent/'dist'
class Doc(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.images=[];self.h1=0;self.title='';self.intitle=False;self.schemas=[];self.schema=False;self.buffer=''
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='h1':self.h1+=1
  if t=='title':self.intitle=True
  if t in ('a','link','script','img'):
   u=d.get('href',d.get('src',''))
   if u.startswith('/') and not u.startswith('//'):self.links.append(u)
  if t=='img':assert d.get('alt'), 'Missing alt';self.images.append(d)
  if t=='script' and d.get('type')=='application/ld+json':self.schema=True;self.buffer=''
 def handle_data(self,s):
  if self.intitle:self.title+=s
  if self.schema:self.buffer+=s
 def handle_endtag(self,t):
  if t=='title':self.intitle=False
  if t=='script' and self.schema:self.schemas.append(json.loads(self.buffer));self.schema=False
seen=set();count=0;blog=0
for p in root.rglob('*.html'):
 d=Doc();d.feed(p.read_text());assert d.h1==1,(p,d.h1);assert d.title not in seen,('Duplicate title',d.title);seen.add(d.title)
 for u in d.links:
  target=root/unquote(urlsplit(u).path).lstrip('/')
  if target.is_dir():target=target/'index.html'
  assert target.exists(),(p,u)
 if p.name!='404.html':
  assert 'rel="canonical"' in p.read_text();assert d.schemas
  blog+=any(x.get('@type')=='BlogPosting' for x in d.schemas[0]['@graph'])
 count+=1
assert blog==100,blog
assert len(list((root/'blog'/'categorie').glob('*/index.html')))==10
assert 'prefers-reduced-motion' in (root/'style.css').read_text()
assert (root/'sitemap.xml').read_text().count('<loc>')==124
contact=(root/'contact'/'index.html').read_text()
assert 'action="https://formsubmit.co/contact@mnr-renovations.fr"' in contact
assert 'method="POST"' in contact
assert "mailto:contact@mnr-renovations.fr?subject=" not in (root/'app.js').read_text()
print(f'OK: {count} pages, 100 articles, 10 categories, unique titles, local links/assets, alt text, schemas and sitemap.')
