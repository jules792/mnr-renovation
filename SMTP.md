# Envoi des demandes par OVH

Dans Vercel, projet mnr-renovation → Settings → Environment Variables :

- `SMTP_PASSWORD` : mot de passe de la boîte OVH, variable privée pour Production.
- `SMTP_USER` : facultatif, par défaut `contact@mnr-renovations.fr`.
- `SMTP_HOST` : facultatif, par défaut `ssl0.ovh.net` (MX Plan Europe).
- `SMTP_PORT` : facultatif, par défaut `465`, TLS. Le port `587` impose STARTTLS.

Pour une offre OVH Email Pro ou Exchange, utiliser le serveur indiqué dans le compte OVH.
Redéployer après tout changement de variable. Ne jamais mettre le mot de passe dans GitHub ou dans les fichiers publics.

Le destinataire reste contact@mnr-renovations.fr. L’adresse du visiteur est placée dans Reply-To.
Une confirmation apparaît seulement après acceptation du message par SMTP ; cela ne prouve pas sa présence dans la boîte de réception.
Sans mot de passe configuré, le serveur retourne une indisponibilité explicite et conserve les champs du visiteur.

Vérification locale : `npm ci`, `npm test`, `python build.py`, `python verify.py`.
Les tests SMTP sont simulés et n’envoient aucun email. Après configuration, tester un envoi réel et confirmer sa réception dans OVH.

Le contrôle d’origine et le champ piège filtrent certains robots, sans constituer une limite de débit distribuée. En cas de spam, appliquer une règle de limitation sur `/api/contact/` dans le pare-feu Vercel.
