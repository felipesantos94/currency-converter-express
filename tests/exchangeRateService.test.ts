import { getExchangeRates } from '../src/services/exchangeRateService';

describe('getExchangeRates', () => {
  it('should fetch and parse exchange rates from ECB XML', async () => {
    const currencyRates = await getExchangeRates();

    expect(Array.isArray(currencyRates)).toBe(true);
    currencyRates.forEach((rate) => {
      expect(rate).toHaveProperty('currency');
      expect(rate).toHaveProperty('rate');
    });
  });
});