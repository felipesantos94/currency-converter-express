export interface ExchangeRates {
  [rate: string]: number;
}

export interface ApiConfig {
  port: string;
}

export interface DatabaseConfig {
  port: string;
  hostname: string;
  username: string;
  password: string;
}

export interface ConversionQuery {
  from: string;
  to: string;
  amount: string;
  precision?: string;
}

export interface ConversionResult {
  amount: string;
  currency: string;
}

export interface CurrencyRate {
  currency: string;
  rate: string;
}