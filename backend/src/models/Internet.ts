import { Schema, model, Document } from 'mongoose';

export interface IInternet extends Document {
  provider: string;
  zip: string[];
  speedMbps: number;
  pricePerMonth: number;
  contractTermMonths: number;
}

const InternetSchema = new Schema<IInternet>({
  provider:           { type: String, required: true },
  zip:                { type: [String], required: true },
  speedMbps:          { type: Number, required: true },
  pricePerMonth:      { type: Number, required: true },
  contractTermMonths: { type: Number, required: true },
});

export const Internet = model<IInternet>(
  'Internet',
  InternetSchema
);
