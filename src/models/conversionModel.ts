import mongoose, { Schema } from 'mongoose';
import { ConversionResult } from './interfaces';

export const conversionSchema = new Schema({
  fromCurrency: String,
  toCurrency: String,
  previousAmount: String,
  convertedAmount: String,
  conversionDate: Date
});

export const ConversionModel = mongoose.model('Conversion', conversionSchema);

export async function logConversion(from: string, result: ConversionResult, amount: string): Promise<void> {
  try {
    const conversionInstance = new ConversionModel({
      fromCurrency: from,
      toCurrency: result.currency,
      previousAmount: amount,
      convertedAmount: result.amount,
      conversionDate: new Date(),
    });

    const savedConversion = await conversionInstance.save();
    console.info('Conversion saved:', savedConversion);

  } catch (error) {
    console.error('Error saving conversion:', error);
    throw new Error(error);
  }
}