import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
   override: true
});
import { Electricity } from './models/Electricity';
import { Internet }    from './models/Internet';

// read MONGODB_URL from env (fall back to localhost)
const mongoUrl =
  process.env.MONGODB_URL ||
  'mongodb://127.0.0.1:27017/tariffs-demo';

mongoose
  .connect(mongoUrl)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const app = express();
app.use(cors());

app.get('/healthz', (_req: Request, res: Response) => res.send('ok 🎉'));

// Electricity ZIPs
app.get('/api/electricity/zips', async (_req, res) => {
  const zips = await Electricity.distinct('zip');
  res.json((zips as string[]).sort());
});

// Electricity quotes
app.get('/api/electricity/quotes', async (req, res) => {
  const { zip, kwh } = req.query as never;
  if (!zip || !kwh) return res.status(400).json({ error: 'Missing params' });
  const usage = parseInt(kwh, 10);

  const rows = await Electricity.find({ zip });
  const offers = rows.map(r => ({
    provider: r.provider,
    pricePerYear: +(r.basePrice + usage * r.pricePerKWh - r.bonus).toFixed(2),
    bonus: r.bonus,
    contractTermMonths: r.contractTermMonths,
  }));
  res.json(offers);
});

// Internet ZIPs
app.get('/api/internet/zips', async (_req, res) => {
  const zips = await Internet.distinct('zip');
  res.json((zips as string[]).sort());
});

// Internet quotes
app.get('/api/internet/quotes', async (req, res) => {
  const { zip, speed } = req.query as never;
  if (!zip || !speed) return res.status(400).json({ error: 'Missing params' });
  const mbps = parseInt(speed, 10);

  const rows = await Internet.find({ zip, speedMbps: { $gte: mbps } });
  const offers = rows.map(r => ({
    provider:       r.provider,
    pricePerMonth:  r.pricePerMonth,
    speedMbps:      r.speedMbps,
    contractTermMonths: r.contractTermMonths,
  }));
  res.json(offers);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
