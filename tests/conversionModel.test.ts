import mongoose from 'mongoose';
import { ConversionModel } from '../src/models/conversionModel';

describe('Conversion Model', () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb+srv://felipe:12345@cluster0.efbwdcv.mongodb.net/", { retryWrites: true, w: 'majority' });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should save a conversion document', async () => {
    const conversionData = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      previousAmount: '100',
      convertedAmount: '85.00',
      conversionDate: new Date(),
    };

    const savedConversion = await ConversionModel.create(conversionData);

    expect(savedConversion.fromCurrency).toBe(conversionData.fromCurrency);
    expect(savedConversion.toCurrency).toBe(conversionData.toCurrency);
    expect(savedConversion.previousAmount).toBe(conversionData.previousAmount);
    expect(savedConversion.convertedAmount).toBe(conversionData.convertedAmount);
    expect(savedConversion.conversionDate).toEqual(conversionData.conversionDate);
  });
});
