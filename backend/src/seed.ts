// backend/src/seed.ts
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
    override: true
});
import mongoose from 'mongoose';
import { Electricity } from './models/Electricity';
import { Internet } from './models/Internet';
import electricityData from '../data/electricity.json';
import internetData from '../data/internet.json';

async function main() {
  const mongoUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/tariffs-demo';
  await mongoose.connect(mongoUrl);

  console.log('✅ MongoDB connected for seeding');
  
  // Clear existing
  await Electricity.deleteMany({});
  await Internet.deleteMany({});

  // Seed electricity
  const eDocs = electricityData.flatMap(row =>
    row.zip.map(z => ({
      provider: row.provider,
      zip: [z],
      pricePerKWh: row.pricePerKWh,
      basePrice: row.basePrice,
      bonus: row.bonus,
      contractTermMonths: row.contractTermMonths,
    }))
  );
  await Electricity.insertMany(eDocs);
  console.log(`🔌 Seeded ${eDocs.length} electricity records`);

  // Seed internet
  const iDocs = internetData.flatMap(row =>
    row.zip.map(z => ({
      provider: row.provider,
      zip: [z],
      speedMbps: row.speedMbps,
      pricePerMonth: row.pricePerMonth,
      contractTermMonths: row.contractTermMonths,
    }))
  );
  await Internet.insertMany(iDocs);
  console.log(`🌐 Seeded ${iDocs.length} internet records`);

  await mongoose.disconnect();
  console.log('🛑 Disconnected');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
