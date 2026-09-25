const nodemailer = require('nodemailer');
const recipient = 'contact@mnr-renovations.fr';
const origins = new Set(['https://mnr-renovation.vercel.app', 'https://www.mnr-renovations.fr', 'https://mnr-renovations.fr']);

function createHandler(sendMail) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({error: 'Méthode non autorisée.'});
    }
    if (!origins.has(req.headers.origin)) return res.status(403).json({error: 'Origine non autorisée.'});
    if (!String(req.headers['content-type'] || '').startsWith('application/json')) return res.status(415).json({error: 'Format non accepté.'});
    const data = req.body;
    if (!data || typeof data !== 'object' || Array.isArray(data) || Buffer.byteLength(JSON.stringify(data)) > 12000) return res.status(400).json({error: 'Demande invalide.'});
    if (data.website) return res.status(400).json({error: 'Demande invalide.'});
    const limits = {name: 100, email: 180, town: 100, project: 100, message: 4000};
    const fields = {};
    for (const [key, max] of Object.entries(limits)) {
      if (typeof data[key] !== 'string') return res.status(400).json({error: 'Veuillez remplir tous les champs.'});
      fields[key] = data[key].trim();
      if (!fields[key] || fields[key].length > max || (key !== 'message' && /[\r\n\x00]/.test(fields[key]))) return res.status(400).json({error: 'Veuillez vérifier les champs du formulaire.'});
    }
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email) || fields.message.length < 15) return res.status(400).json({error: 'Vérifiez votre email et la description du projet.'});
    if (!process.env.SMTP_PASSWORD) return res.status(503).json({error: 'L’envoi est temporairement indisponible. Contactez-nous par téléphone ou par email.'});
    try {
      const result = await sendMail({
        from: {name: 'M.N.R Rénovation — Site', address: process.env.SMTP_USER || recipient},
        to: recipient,
        replyTo: fields.email,
        subject: 'Nouvelle demande de projet — M.N.R Rénovation',
        text: `Nom : ${fields.name}\nEmail : ${fields.email}\nCommune : ${fields.town}\nProjet : ${fields.project}\n\n${fields.message}`,
        disableFileAccess: true,
        disableUrlAccess: true
      });
      if (!result.accepted?.includes(recipient)) throw new Error('Recipient not accepted');
      return res.status(200).json({success: true});
    } catch {
      return res.status(502).json({error: 'Le message n’a pas pu être envoyé. Réessayez plus tard ou contactez-nous directement.'});
    }
  };
}

module.exports = createHandler(async message => {
  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'ssl0.ovh.net', port, secure: port === 465,
    requireTLS: true,
    auth: {user: process.env.SMTP_USER || recipient, pass: process.env.SMTP_PASSWORD},
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    tls: {minVersion: 'TLSv1.2'}
  });
  try { return await transport.sendMail(message); } finally { transport.close(); }
});
module.exports.createHandler = createHandler;
