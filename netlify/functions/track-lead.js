const crypto = require('crypto');
const https = require('https');

exports.handler = async function (event) {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    if (!body || !body.event_id) {
      return { statusCode: 400, body: 'missing event_id' };
    }

    // Respect consent flag from client - do not forward if consent not given
    if (!body.consent) {
      return { statusCode: 204, body: 'no consent' };
    }

    const email = (body.email || '').trim().toLowerCase();
    const hashedEmail = email ? crypto.createHash('sha256').update(email).digest('hex') : undefined;

    const gatewayId = process.env.GATEWAY_ID;
    const accessToken = process.env.GATEWAY_ACCESS_TOKEN;
    if (!gatewayId || !accessToken) {
      return { statusCode: 500, body: 'gateway not configured' };
    }

    const payload = {
      data: [
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: body.event_id,
          user_data: hashedEmail ? { em: hashedEmail } : {},
          custom_data: {
            source: 'website',
            page: body.page || '/',
            form: body.form || 'contact'
          }
        }
      ]
    };

    const postData = JSON.stringify(payload);

    const options = {
      hostname: 'graph.facebook.com',
      path: `/${gatewayId}/events?access_token=${accessToken}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
      });
      req.on('error', reject);
      req.write(postData);
      req.end();
    });

    return response;
  } catch (err) {
    return { statusCode: 500, body: String(err) };
  }
};
