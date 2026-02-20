const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: 'info@algoritmiadesarrollos.com.ar',
    pass: 'Qpzm123Qpzm-',
  },
});

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, phone, email, time } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"></head>
    <body style="font-family:Arial,sans-serif;background:#f7f5f1;padding:20px;">
      <div style="max-width:500px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">
        <div style="background:linear-gradient(135deg,#7a9e87,#4d7a5e);padding:20px 24px;">
          <h2 style="color:#fff;margin:0;font-size:18px;">🌿 Nueva solicitud de turno</h2>
          <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;font-size:13px;">Psicóloga Rocío</p>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:8px 0;color:#888;width:140px;">👤 Nombre</td>
              <td style="padding:8px 0;font-weight:500;color:#1e1e1e;">${name}</td>
            </tr>
            <tr style="border-top:1px solid #e5ddd5;">
              <td style="padding:8px 0;color:#888;">📱 WhatsApp</td>
              <td style="padding:8px 0;font-weight:500;color:#1e1e1e;">${phone}</td>
            </tr>
            <tr style="border-top:1px solid #e5ddd5;">
              <td style="padding:8px 0;color:#888;">✉️ Email</td>
              <td style="padding:8px 0;font-weight:500;color:#1e1e1e;">${email}</td>
            </tr>
            <tr style="border-top:1px solid #e5ddd5;">
              <td style="padding:8px 0;color:#888;">🕐 Horario</td>
              <td style="padding:8px 0;font-weight:500;color:#1e1e1e;">${time || '—'}</td>
            </tr>
          </table>
        </div>
        <div style="background:#f7f5f1;padding:14px 24px;font-size:11px;color:#aaa;text-align:center;">
          Enviado desde el formulario de turnos · ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: '"Psicóloga Rocío – Formulario" <info@algoritmiadesarrollos.com.ar>',
      to: 'lucagazze1@gmail.com',
      subject: `Nueva solicitud de turno – ${name}`,
      html,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('SMTP error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
