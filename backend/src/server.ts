import express, { Request, Response } from 'express';
import cors from 'cors';
import * as path from 'path';
import * as fs from 'fs';

type ElectricityRow = {
  provider: string;
  zip: string[];
  pricePerKWh: number;
  basePrice: number;
  bonus: number;
  contractTermMonths: number;
};

const electricity: ElectricityRow[] = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../data/electricity.json'),
    'utf-8'
  )
);

const internetData: {
  provider: string
  zip: string[]
  speedMbps: number
  pricePerMonth: number
  contractTermMonths: number
}[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/internet.json'), 'utf-8')
)

const app = express();
app.use(cors());

app.get('/healthz', (_req: Request, res: Response) => res.send('ok 🎉'));

app.get('/api/electricity/zips', (_req: Request, res: Response) => {
  const zips = Array.from(new Set(electricity.flatMap(r => r.zip))).sort();
  res.json(zips);
});

app.get('/api/electricity/quotes', (req: Request, res: Response) => {
  const { zip, kwh } = req.query as { zip?: string; kwh?: string };

  if (!zip || !kwh) {
    return res.status(400).json({ error: 'Missing zip or kwh query param' });
  }

  const usage = parseInt(kwh, 10);
  const offers = electricity
    .filter(row => row.zip.includes(zip))
    .map(row => ({
      provider: row.provider,
      pricePerYear: +(row.basePrice + usage * row.pricePerKWh - row.bonus).toFixed(2),
      bonus: row.bonus,
      contractTermMonths: row.contractTermMonths,
    }))
    .sort((a, b) => a.pricePerYear - b.pricePerYear);   // cheapest first

  res.json(offers);
});

app.get('/api/internet/zips', (_req: Request, res: Response) => {
  const zips = Array.from(
    new Set(internetData.flatMap(r => r.zip))
  ).sort()
  res.json(zips)
})

app.get('/api/internet/quotes', (req: Request, res: Response) => {
  const { zip, speed } = req.query as { zip?: string; speed?: string }
  if (!zip || !speed) return res.status(400).json({ error: 'Missing params' })

  const mbps = parseInt(speed, 10)
  const offers = internetData
    .filter(r => r.zip.includes(zip) && mbps <= r.speedMbps)
    .map(r => ({
      provider: r.provider,
      pricePerMonth: r.pricePerMonth,
      speedMbps: r.speedMbps,
      contractTermMonths: r.contractTermMonths
    }))
  res.json(offers)
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
