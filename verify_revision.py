from pathlib import Path
import re,hashlib
from PIL import Image
root=Path(__file__).parent/'dist'
def assert_unique(items):
 assert len(items)==len(set(items)), 'Repeated image in a group of cards'
# Positive and negative controls for the duplicate detector.
assert_unique(['one','two'])
try:assert_unique(['one','one'])
except AssertionError:pass
else:raise AssertionError('Negative control did not detect duplicate')
checked=0;used=set()
for p in root.rglob('*.html'):
 s=p.read_text()
 assert '↗' not in s and 'Menu ☰' not in s,p
 assert not re.search(r'(?:src|srcset)="[^"]*photo-11-',s),p
 cards=re.findall(r'<a class="card[^\"]*".*?</a>',s,re.S)
 images=[re.search(r'<img[^>]*src="([^"]+)"',card).group(1) for card in cards]
 assert_unique(images)
 for image in images:
  if '/journal/' in image:used.add(image)
 for img in re.findall(r'<img\b[^>]*>',s):
  attrs=dict(re.findall(r'([\w-]+)="([^"]*)"',img));path=root/attrs['src'].lstrip('/')
  with Image.open(path) as im:
   assert (int(attrs['width']),int(attrs['height']))==im.size,(p,path,'intrinsic dimensions mismatch')
 checked+=1
files=list((root/'assets/journal').glob('*-1280.webp'))
assert len(files)==30, len(files)
assert len({hashlib.sha256(p.read_bytes()).hexdigest() for p in files})==30,'Duplicate image files'
assert len(used)==30, len(used)
category_pages=list((root/'blog/categorie').glob('*/index.html'))
for p in category_pages:
 links=set(re.findall(r'href="(/blog/(?!categorie)[^/]+/)"',p.read_text()))
 assert len(links)==10,(p,len(links))
print(f'REVISION_OK: {checked} documents; all card groups unique; 30 distinct illustrations; no Reel; SVG arrows; intrinsic dimensions match.')
