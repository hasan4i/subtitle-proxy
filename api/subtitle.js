const OS_KEY = 'wDfjQQaz92dFqMPbyM82LEY0P0FK1N8S';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action, query, episode, season, file_id, url } = req.query;

  try {
    if (action === 'search') {
      const apiUrl = `https://api.opensubtitles.com/api/v1/subtitles?query=${encodeURIComponent(query)}&season_number=${season||1}&episode_number=${episode||1}&languages=tr&type=episode`;
      const r = await fetch(apiUrl, {
        headers: { 'Api-Key': OS_KEY, 'Content-Type': 'application/json', 'User-Agent': 'HanimeStream v1.0' }
      });
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (action === 'download') {
      const r = await fetch('https://api.opensubtitles.com/api/v1/download', {
        method: 'POST',
        headers: { 'Api-Key': OS_KEY, 'Content-Type': 'application/json', 'User-Agent': 'HanimeStream v1.0' },
        body: JSON.stringify({ file_id: parseInt(file_id) })
      });
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (action === 'srt') {
      const r = await fetch(url);
      const text = await r.text();
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(200).send(text);
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

