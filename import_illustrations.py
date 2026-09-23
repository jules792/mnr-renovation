"""Encode delivered ImageGen assets as responsive WebP without altering their content."""
from pathlib import Path
from PIL import Image
import json, shutil
src=Path('/home/yacine/Documents/ChatGPT/MNR-Rénovation-assets/journal')
root=Path(__file__).parent;dest=root/'dist/assets/journal';dest.mkdir(parents=True,exist_ok=True)
count=0
for p in sorted(src.glob('c*-*.png')):
 for width in (640,1280):
  out=dest/f'{p.stem}-{width}.webp'
  if out.exists() and out.stat().st_mtime>=p.stat().st_mtime:continue
  with Image.open(p) as im:
   im=im.convert('RGB');im.thumbnail((width,width));im.save(out,'WEBP',quality=85,method=6)
 count+=1
for name in ('prompts.txt','manifest.json'):
 if (src/name).exists():shutil.copyfile(src/name,root/'sources'/('journal-'+name))
print(f'Imported {count} editorial illustrations.')
