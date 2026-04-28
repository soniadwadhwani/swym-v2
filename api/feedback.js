const { getSheetsClient } = require('./_googleSheets');

function respond(res, statusCode, payload) {
  return res.status(statusCode).json(payload);
}

function normalizeFeedbackRows(values) {
  if (!Array.isArray(values)) return [];

  const rows = values.map(row => ({
    timestamp: row?.[0] || '',
    rating: Number(row?.[1] || 0),
    feedback: row?.[2] || '',
    name: row?.[3] || '',
  }));

  const withoutHeader = rows.filter((row, idx) => {
    if (idx !== 0) return true;
    const c0 = String(row.timestamp || '').toLowerCase();
    const c1 = String(row.rating || '').toLowerCase();
    return !(c0.includes('timestamp') || c1.includes('rating'));
  });

  return withoutHeader.reverse();
}

async function readFeedbackRows() {
  const { accessToken, spreadsheetId, sheetName } = await getSheetsClient();
  const preferredRange = `${sheetName}!A:D`;
  const fallbackRange = 'A:D';

  const fetchRows = async (range) => {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    return normalizeFeedbackRows(data.values || []);
  };

  try {
    return await fetchRows(preferredRange);
  } catch (err) {
    if (String(err.message || '').includes('Unable to parse range')) {
      return await fetchRows(fallbackRange);
    }
    throw new Error(`Failed to read Google Sheet rows: ${err.message}`);
  }
}

async function appendFeedbackRow({ rating, feedback, name }) {
  const { accessToken, spreadsheetId, sheetName } = await getSheetsClient();
  const timestamp = new Date().toISOString();

  const appendRows = async (range) => {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [[timestamp, rating, feedback, name]],
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  };

  try {
    await appendRows(`${sheetName}!A:D`);
  } catch (err) {
    if (String(err.message || '').includes('Unable to parse range')) {
      await appendRows('A:D');
      return;
    }
    throw new Error(`Failed to append Google Sheet row: ${err.message}`);
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const rows = await readFeedbackRows();
      return respond(res, 200, { rows });
    } catch (err) {
      return respond(res, 500, { error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const rating = Number(req.body?.rating);
      const feedback = String(req.body?.feedback || '').trim();
      const name = String(req.body?.name || '').trim();

      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return respond(res, 400, { error: 'Rating must be an integer between 1 and 5' });
      }

      if (!feedback) {
        return respond(res, 400, { error: 'Feedback is required' });
      }

      await appendFeedbackRow({ rating, feedback, name });
      const rows = await readFeedbackRows();

      return respond(res, 200, { success: true, rows });
    } catch (err) {
      return respond(res, 500, { error: err.message });
    }
  }

  return respond(res, 405, { error: 'Method not allowed' });
}
