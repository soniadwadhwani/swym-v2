const crypto = require('crypto');
const fs = require('fs');

const GOOGLE_TOKEN_AUDIENCE = 'https://oauth2.googleapis.com/token';
const GOOGLE_SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

function toBase64Url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function getEnvConfig() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || 'Feedback';
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const serviceAccountFile = process.env.GOOGLE_SERVICE_ACCOUNT_FILE;

  let clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (serviceAccountJson) {
    try {
      const parsed = JSON.parse(serviceAccountJson);
      clientEmail = parsed.client_email || clientEmail;
      privateKeyRaw = parsed.private_key || privateKeyRaw;
    } catch (err) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON');
    }
  } else if (serviceAccountFile) {
    try {
      const raw = fs.readFileSync(serviceAccountFile, 'utf-8');
      const parsed = JSON.parse(raw);
      clientEmail = parsed.client_email || clientEmail;
      privateKeyRaw = parsed.private_key || privateKeyRaw;
    } catch (err) {
      throw new Error(`Failed to read GOOGLE_SERVICE_ACCOUNT_FILE: ${err.message}`);
    }
  }

  if (!clientEmail || !privateKeyRaw || !spreadsheetId) {
    throw new Error('Google Sheets environment variables are not fully configured');
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

  return {
    clientEmail,
    privateKey,
    spreadsheetId,
    sheetName,
  };
}

async function getGoogleAccessToken(clientEmail, privateKey) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_AUDIENCE,
    exp: now + 3600,
    iat: now,
  };

  const unsignedToken = `${toBase64Url(JSON.stringify(header))}.${toBase64Url(JSON.stringify(payload))}`;

  const signature = crypto
    .createSign('RSA-SHA256')
    .update(unsignedToken)
    .sign(privateKey, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const assertion = `${unsignedToken}.${signature}`;

  const tokenResponse = await fetch(GOOGLE_TOKEN_AUDIENCE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new Error(`Failed to get Google access token: ${errorText}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

async function getSheetsClient() {
  const config = getEnvConfig();
  const accessToken = await getGoogleAccessToken(config.clientEmail, config.privateKey);

  return {
    accessToken,
    spreadsheetId: config.spreadsheetId,
    sheetName: config.sheetName,
  };
}

module.exports = {
  getSheetsClient,
};
