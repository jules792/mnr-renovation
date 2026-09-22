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

Les 18 photographies transmises proviennent de `/home/yacine/Documents/Codex/MNR-Rénovation/Photos`. Les sources copiées sont conservées dans `sources/photos`, les versions WebP sont dans `dist/assets`. Les comparateurs présentent les originaux convertis, sans modification générative des travaux. Deux visuels ont une retouche ImageGen (escalier et terrasse), signalée sur les pages. Le logo généré est `dist/assets/logo.png`. Les prompts exacts sont conservés dans `sources/prompts-imagegen.txt`.

## SEO et GEO

HTML pré-rendu, titres et descriptions propres à chaque page, un H1 par page, liens canoniques, sitemap XML, robots.txt, données JSON-LD entreprise/prestations/articles/fil d’Ariane/FAQ, contenus structurés en réponses et maillage par thème. `llms.txt` facilite une lecture structurée mais ne garantit pas l’inclusion dans les réponses des assistants. Aucune promesse de classement ni score Lighthouse non mesuré.

## Mise en service sur le domaine définitif

La version Sites est privée. Elle ne remplace pas le site historique. Pour transférer sur le domaine de production, régénérer avec `SITE_URL=https://www.mnr-renovations.fr python build.py`, vérifier les canoniques et sitemap, puis publier l’ensemble de `dist` sur l’hébergement retenu. La règle `/cgv` vers `/mentions-legales/` est dans `_redirects` pour un hébergement compatible ; adapter cette redirection sur les autres serveurs. Préserver le domaine existant et ses liens. Mettre à jour les informations d’hébergement et faire valider les textes métier et contractuels par l’entreprise avant publication publique. Soumettre le sitemap aux outils des moteurs une fois le domaine public opérationnel.

Le formulaire ouvre la messagerie et n’effectue aucun envoi serveur. Il ne collecte rien dans une base. Les coordonnées, l’identité et les métiers ont été repris du site historique consulté le 22 septembre 2026. Aucun avis, qualification, prix ou délai supplémentaire n’a été inventé. Les conseils éditoriaux sont des repères généraux, à adapter à l’état réel de chaque chantier.

## Contrôles réalisés

125 documents HTML, incluant la page 404 ; 124 URLs dans le sitemap ; 100 BlogPosting et 10 catégories. Vérification des liens et ressources locales, balises alt, titres uniques et JSON-LD. Contrôle navigateur : accueil, menu mobile, absence de débordement horizontal, comparateur au clavier, filtre des réalisations, champs requis du contact et absence d’erreurs console observées.
