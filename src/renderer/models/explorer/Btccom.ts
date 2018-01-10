import { IAddress } from "../IAddress";
import { ExplorerBase } from "./ExplorerBase";

// BlockExplorer - BTC.com
export class Btccom extends ExplorerBase {
  public constructor(params: { domain: string }) {
    super();
    this.baseUrl = `https://${params.domain}/v3/address/`;
    this.isNeedProxy = true;
  }

  public async showBalanceAsync(address: string): Promise<number> {
    try {
      const response = await this.getAsync<IResponse>(this.baseUrl + address);
      if (response.err_no === 0) {
        return response.data.balance * 0.00000001;
      }
    } catch {
      // ignored
    }
    return 0;
  }

  public async showBalancesAsync(addresses: string[]): Promise<IAddress[]> {
    try {
      const response = await this.getAsync<IMultipleResponse>(this.baseUrl + addresses.join(","));
      if (response.err_no === 0) {
        return response.data.map((w, i) => {
          if (w) {
            return { address: w.address, balance: w.balance * 0.00000001 } as IAddress;
          } else {
            return { address: addresses[i], balance: 0 } as IAddress;
          }
        });
      }
    } catch {
      // ignored
    }
    return addresses.map((w) => {
      return { address: w, balance: 0 } as IAddress;
    });
  }
}

interface IData {
  address: string;
  received: number;
  sent: number;
  balance: number;
  tx_count: number;
  unconfirmed_tx_count: number;
  unconfirmed_received: number;
  unconfirmed_sent: number;
  unspent_tx_count: number;
  first_tx: string;
  last_tx: string;
}

interface IResponse {
  err_no: number;
  data: IData;
}

interface IMultipleResponse {
  err_no: number;
  data: IData[];
}
