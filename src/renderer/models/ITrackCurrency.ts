import { IAddress } from "./IAddress";

export interface ITrackCurrency {
  addresses: IAddress[];
  id: string;
}

export function sumBalances(currency: ITrackCurrency): number {
  return currency.addresses.reduce((prev, current) => {
    return { address: "", balance: prev.balance + current.balance };
  }).balance;
}
