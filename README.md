# M.N.R Rénovation — refonte

Site statique français : 124 pages, dont 100 articles regroupés en 10 catégories.

## Modifier et vérifier

- `build.py` : gabarits, pages et métadonnées.
- `articles.txt` : textes des 100 articles, 5 champs séparés par `|`.
- `dist/style.css` et `dist/app.js` : présentation et interactions.
- `python build.py` : régénérer les pages.
- `python verify.py` et `node --check dist/app.js` : vérifications.
- `python -m http.server 4173 --directory dist` : aperçu local.

## Photos et logo

Les 18 photographies initialement transmises proviennent de `/home/yacine/Documents/Codex/MNR-Rénovation/Photos`. Les sources copiées sont conservées dans `sources/photos`, les versions WebP sont dans `dist/assets`. Les comparateurs présentent les originaux convertis, sans modification générative des travaux. Deux visuels ont une retouche ImageGen (escalier et terrasse), signalée sur les pages. Le logo généré est `dist/assets/logo.png`. Les prompts exacts sont conservés dans `sources/prompts-imagegen.txt`.

## SEO et GEO

HTML pré-rendu, titres et descriptions propres à chaque page, un H1 par page, liens canoniques, sitemap XML, robots.txt, données JSON-LD entreprise/prestations/articles/fil d’Ariane/FAQ, contenus structurés en réponses et maillage par thème. `llms.txt` facilite une lecture structurée mais ne garantit pas l’inclusion dans les réponses des assistants. Aucune promesse de classement ni score Lighthouse non mesuré.

## Mise en service sur le domaine définitif

La version Sites est publique. Elle ne remplace pas le site historique. Pour transférer sur le domaine de production, régénérer avec `SITE_URL=https://www.mnr-renovations.fr python build.py`, vérifier les canoniques et sitemap, puis publier l’ensemble de `dist` sur l’hébergement retenu. La règle `/cgv` vers `/mentions-legales/` est dans `_redirects` pour un hébergement compatible ; adapter cette redirection sur les autres serveurs. Préserver le domaine existant et ses liens. Mettre à jour les informations d’hébergement et faire valider les textes métier et contractuels par l’entreprise avant publication publique. Soumettre le sitemap aux outils des moteurs une fois le domaine public opérationnel.

Le formulaire utilise une fonction Vercel et le SMTP OVH pour envoyer les demandes à contact@mnr-renovations.fr. Configurer la variable privée SMTP_PASSWORD comme indiqué dans SMTP.md. Il ne collecte rien dans une base. Les coordonnées, l’identité et les métiers ont été repris du site historique consulté le 22 septembre 2026. Aucun avis, qualification, prix ou délai supplémentaire n’a été inventé. Les conseils éditoriaux sont des repères généraux, à adapter à l’état réel de chaque chantier.

## Contrôles réalisés

125 documents HTML, incluant la page 404 ; 124 URLs dans le sitemap ; 100 BlogPosting et 10 catégories. Vérification des liens et ressources locales, balises alt, titres uniques et JSON-LD. Contrôle navigateur : accueil, menu mobile, absence de débordement horizontal, comparateur au clavier, filtre des réalisations, champs requis du contact et absence d’erreurs console observées.

## Corrections photos et mobile — 23 septembre 2026

- Retrait de la capture Reel de la galerie.
- Photographies différentes pour les sept cartes des savoir-faire.
- Trente illustrations éditoriales ImageGen, trois par catégorie, dans `dist/assets/journal/`. Les prompts exacts et le manifeste sont dans `sources/journal-prompts.txt` et `sources/journal-manifest.json`. Les mentions Illustration distinguent ces images des chantiers réels.
- Les suggestions de lecture excluent l’image de l’article en cours et ne répètent pas une illustration entre cartes.
- Les catégories mettent en avant trois sujets avec des images distinctes ; les sept autres articles restent accessibles dans une liste avec leur introduction.
- Dimensions intrinsèques exactes et hauteur proportionnelle des images, dont la page contact et les galeries mobiles.
- Icônes de flèche SVG identiques sur ordinateur et mobile, menu anthracite/or avec fermeture extérieure et touche Échap.
- Page souple, pied de page final et prise en compte de la zone de sécurité mobile.

`python import_illustrations.py` importe les images livrées ; `python build.py` régénère les pages ; `python verify_revision.py` vérifie les doublons, les dimensions, les icônes et le retrait du Reel.
