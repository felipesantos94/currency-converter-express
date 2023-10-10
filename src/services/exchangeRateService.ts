import { CurrencyRate } from "../models/interfaces";
import * as xml2js from "xml2js";

async function extractCurrencyRate(objStr: string | Record<string, unknown>, filteredData: CurrencyRate[] = []): Promise<CurrencyRate[]> {
  if (typeof objStr === 'string') {
    try {
      const parsedJson = JSON.parse(objStr);
      objStr = parsedJson;
    } catch (error) {
      // Ignore parsing errors for this string
    }
  }

  if (typeof objStr === 'object') {
    if ('currency' in objStr && 'rate' in objStr) {
      filteredData.push({
        currency: objStr.currency as string,
        rate: objStr.rate as string,
      });
    } else {
      for (const key in objStr) {
        await extractCurrencyRate(objStr[key] as string | Record<string, unknown>, filteredData as CurrencyRate[]);
      }
    }
  }

  return filteredData;
}

export async function getExchangeRates(): Promise<CurrencyRate[]> {
  const xmlResponse = await fetch("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml");
  const xml = await xmlResponse.text();
  
  const parser = new xml2js.Parser();
  
  let stringJson: string;
  parser.parseString(xml, (err, result) => {
    if (err) {
      console.error('Error parsing XML:', err);
      return;
    }
    
    stringJson = JSON.stringify(result, null, 2);
  });

  const filteredData: CurrencyRate[] = await extractCurrencyRate(stringJson);
  return filteredData;
}
