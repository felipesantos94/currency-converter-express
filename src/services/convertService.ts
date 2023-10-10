import { NextFunction, Request, Response } from "express";
import { getExchangeRates } from "../services/exchangeRateService";
import { ConversionQuery, ConversionResult } from "src/models/interfaces";
import { HttpError } from 'http-errors';
import { logConversion } from "../models/conversionModel";

export type ConversionRequest = Request<null, null, null, ConversionQuery>;

export async function convertCurrency(req: ConversionRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const exchangeRates = await getExchangeRates();
  
    const { from, to, amount, precision = '4' } = req.query;

    const validCurrencyCode = /^[A-Z]{3}$/; // ISO-4217 currency code pattern
    if (!validCurrencyCode.test(from) || !validCurrencyCode.test(to)) {
      throw new HttpError('Invalid currency code(s)');
    }

    const inputAmount = parseFloat(amount);
    if (isNaN(inputAmount) || !Number.isFinite(inputAmount)) {
      throw new HttpError('Invalid input amount');
    }
  
    const fromRate = exchangeRates.find((rate) => rate.currency === from);
    const toRate = exchangeRates.find((rate) => rate.currency === to);
  
    if (!fromRate || !toRate) {
      throw new HttpError('Invalid rate exchange'); 
    }
  
    const fromValue = parseFloat(fromRate.rate);
    const toValue = parseFloat(toRate.rate);
  
    const convertedAmount = (inputAmount / fromValue) * toValue;
    const formattedAmount = convertedAmount.toFixed(parseInt(precision, 10));
  
    const result: ConversionResult = { amount: formattedAmount, currency: to };

    await logConversion(from, result, amount); 
  
    return res.status(418).json(result);
  } catch (error) {
    next(error);
  }
}
