export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
  }

  try {
    const { prompt, model, systemPrompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.length > 4000) {
      return res.status(400).json({ error: 'Invalid prompt' });
    }

    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: String(systemPrompt).slice(0, 2000) });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: `Groq API error: ${err}` });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'No response';

    return res.status(200).json({
      reply,
      model: data.model,
      usage: data.usage,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
