# Gates: corrections photos et mobile MNR

OWNS: build.py, dist/**, verify.py, verify_revision.py, GATES.md, README.md, sources/**

Scope: lien public, illustrations variées, suppression du Reel, proportions des images et corrections de navigation mobile.

- [x] G1: toutes les pages gardent leurs liens, métadonnées et ressources valides
  CHECK: python verify.py
  EXPECT: OK:
  EVIDENCE: automatic-evidence=v1; definition-sha256=8f2d445bc05c5b922a6e5f829385f8c8c55efd09aae61610c9b5db718e3923d5; exit=0; EXPECT=matched; output-sha256=b69cdb6796905a352a73719986fe3b299081d78c481daf1b0b082c26c227ecf2; output-bytes=110; shell=/bin/sh; cwd=/home/yacine/Documents/ChatGPT/MNR-Rénovation/site; path=a530b9ebe27f/15 entries

- [x] G2: les groupes de cartes ont des illustrations distinctes, sans Reel, et les flèches sont des SVG
  CHECK: python verify_revision.py
  EXPECT: REVISION_OK
  EVIDENCE: automatic-evidence=v1; definition-sha256=bfb1333068275665e10b1aec9199d66d85d65f6644a7e709a3b3101b30a63e79; exit=0; EXPECT=matched; output-sha256=87db815392d7d4d403a80459ac18f0ce6f20394f704fa7fb2b13842002e80b95; output-bytes=128; shell=/bin/sh; cwd=/home/yacine/Documents/ChatGPT/MNR-Rénovation/site; path=a530b9ebe27f/15 entries

- [x] G3: menu mobile lisible et fonctionnel, photos non étirées, pied de page sans vide artificiel
  EVIDENCE: navigateur local, formats 320 et 390 px : aucun débordement, écart pied de page 0 px ; contact et galerie ratios intrinsèques ; menu ouvert/fermé et contrôle visuel ordinateur validés.

- [ ] G4: version mise à jour déployée avec accès public conservé
  EVIDENCE: pending
