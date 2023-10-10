import { Request, Response, NextFunction } from 'express';
import { convertCurrency } from '../src/services/convertService';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

type ConversionQuery = {
  from: string;
  to: string;
  amount: string;
  precision?: string;
};

type ConversionRequest = Request<null, null, null, ConversionQuery>;

let mongo: MongoMemoryServer;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri, { retryWrites: true, w: 'majority' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

jest.mock('../src/services/exchangeRateService', () => ({
  getExchangeRates: jest.fn(() => Promise.resolve([
    { currency: 'USD', rate: '1.0' },
    { currency: 'EUR', rate: '0.85' }
  ])),
}));

describe('convert', () => {
  it('should convert currency and return JSON response', async () => {
    const req: ConversionRequest = {
      query: {
        from: 'USD',
        to: 'EUR',
        amount: '100',
        precision: '2',
      },
      params: null,
      body: null,
    } as ConversionRequest;

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next: NextFunction = jest.fn();

    await convertCurrency(req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(418);
    expect(res.json).toHaveBeenCalledWith({ amount: '85.00', currency: 'EUR' });
  });

  it('should handle invalid input amount', async () => {
    const req: ConversionRequest = {
      query: {
        from: 'USD',
        to: 'EUR',
        amount: 'invalid', // Invalid amount
        precision: '2',
      },
      params: null,
      body: null,
    } as ConversionRequest;

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next: NextFunction = jest.fn();

    await convertCurrency(req, res as Response, next);

    expect(res.status).not.toHaveBeenCalledWith(418);
    expect(res.json).not.toHaveBeenCalledWith({ amount: '85.00', currency: 'EUR' });
  });

  it('should handle invalid currency codes', async () => {
    const req: ConversionRequest = {
      query: {
        from: 'INVALID', // Invalid currency code
        to: 'EUR',
        amount: '100',
        precision: '2',
      },
      params: null,
      body: null,
    } as ConversionRequest;

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next: NextFunction = jest.fn();

    await convertCurrency(req, res as Response, next);

    expect(res.status).not.toHaveBeenCalledWith(418);
    expect(res.json).not.toHaveBeenCalledWith({ amount: '85.00', currency: 'EUR' });
  });
});