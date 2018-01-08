import { Btccom } from "./explorer/Btccom";
import { ExplorerBase } from "./explorer/ExplorerBase";

// Cygnus supported currencies/tokens.
export interface ISupportCurrencyWithSolver {
  // CoinMarketCap ID
  id: string;

  // Currenty/Token name
  name: string;

  // Balance solver ID
  solver: ExplorerBase;
}

export interface ISupportCurrency {
  id: string;
  name: string;
}

export const supportedCurrenciesWithSolver: ISupportCurrencyWithSolver[] = [
  { id: "bitcoin", name: "Bitcoin", solver: new Btccom({ domain: "chain.api.btc.com" }) },
  { id: "bitcoin-cash", name: "Bitcoin Cash", solver: new Btccom({ domain: "bch-chain.api.btc.com" }) },
];

export const supportedCurrencies: ISupportCurrency[] = supportedCurrenciesWithSolver.map((w) => {
  return { id: w.id, name: w.name } as ISupportCurrency;
});
