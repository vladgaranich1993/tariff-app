import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/healthz', (_req, res) => res.send('ok 🎉'));

// ------ mock electricity endpoint ----------
import electricity from '../data/electricity.json';
app.get('/api/electricity/quotes', (req, res) => {
  const { zip, kwh } = req.query as { zip?: string; kwh?: string };
  if (!zip || !kwh) return res.status(400).json({ error: 'Missing params' });
  const usage = parseInt(kwh, 10);
  const rows = (electricity as any[]).filter(t => t.zip.includes(zip)).map(t => ({
    provider: t.provider,
    pricePerYear: t.basePrice + usage * t.pricePerKWh - t.bonus,
    bonus: t.bonus,
  }));
  res.json(rows);
});

app.listen(4000, () => console.log('Backend listening on http://localhost:4000'));
