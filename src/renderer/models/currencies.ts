import { BlockCypher } from "./explorer/BlockCypher";
import { Btccom } from "./explorer/Btccom";
import { ExplorerBase } from "./explorer/ExplorerBase";

// Cygnus supported currencies/tokens.
export interface ISupportCurrencyWithSolver extends ISupportCurrency {
  // Balance solver instance
  solver: ExplorerBase;
}

export interface ISupportCurrency {
  // CoinMarketCap ID
  id: string;

  // Currency/Token name
  name: string;

  // Currency/Token symbol
  symbol: string;
}

export const supportedCurrenciesWithSolver: ISupportCurrencyWithSolver[] = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", solver: new Btccom({ domain: "chain.api.btc.com" }) },
  { id: "bitcoin-cash", name: "Bitcoin Cash", symbol: "BCH", solver: new Btccom({ domain: "bch-chain.api.btc.com" }) },
  { id: "dash", name: "Dash", symbol: "DASH", solver: new BlockCypher({ currency: "dash" }) },
  { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", solver: new BlockCypher({ currency: "doge" }) },
  { id: "litecoin", name: "Litecoin", symbol: "LTC", solver: new BlockCypher({ currency: "ltc" }) },
];

export const supportedCurrencies: ISupportCurrency[] = supportedCurrenciesWithSolver.map((w) => {
  return w as ISupportCurrency;
});

export function resolveFromId(id: string): ISupportCurrencyWithSolver {
  const currency = supportedCurrenciesWithSolver.find((w) => w.id === id);
  if (currency) {
    return currency as ISupportCurrencyWithSolver;
  }
  return {} as ISupportCurrencyWithSolver;
}
