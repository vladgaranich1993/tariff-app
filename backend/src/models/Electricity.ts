import { Schema, model, Document } from 'mongoose';

export interface IElectricity extends Document {
  provider: string;
  zip: string[];
  pricePerKWh: number;
  basePrice: number;
  bonus: number;
  contractTermMonths: number;
}

const ElectricitySchema = new Schema<IElectricity>({
  provider:           { type: String, required: true },
  zip:                { type: [String], required: true },
  pricePerKWh:        { type: Number, required: true },
  basePrice:          { type: Number, required: true },
  bonus:              { type: Number, required: true },
  contractTermMonths: { type: Number, required: true },
});

export const Electricity = model<IElectricity>(
  'Electricity',
  ElectricitySchema
);
