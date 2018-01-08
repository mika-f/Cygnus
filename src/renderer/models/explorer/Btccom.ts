import { ExplorerBase } from "./ExplorerBase";

// BlockExplorer - BTC.com
export class Btccom extends ExplorerBase {
  public constructor(params: { domain: string }) {
    super();
    this.baseUrl = `https://${params.domain}/v3/address/`;
  }

  public async showBalanceAsync(address: string): Promise<number> {
    try {
      const response = await this.getAsync<IResponse>(this.baseUrl + address);
      if (response.err_no === 0) {
        return response.data.balance;
      }
    } catch {
      // ignored
    }
    return 0;
  }

  public async showBalancesAsync(addresses: string[]): Promise<number[]> {
    try {
      const response = await this.getAsync<IMultipleResponse>(this.baseUrl + addresses.join(","));
      if (response.err_no === 0) {
        return response.data.map((w) => w.balance);
      }
    } catch {
      // ignored
    }
    return addresses.map((w) => 0);
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
