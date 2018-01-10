import { IAddress } from "../IAddress";
import { ExplorerBase } from "./ExplorerBase";

// BlockCypher - https://www.blockcypher.com
export class BlockCypher extends ExplorerBase {
  public constructor(params: { currency: string }) {
    super();
    this.baseUrl = `https://api.blockcypher.com/v1/${params.currency}/main/addrs/`;
  }

  public async showBalanceAsync(address: string): Promise<number> {
    try {
      const response = await this.getAsync<IResponse>(`${this.baseUrl}${address}/balance`);
      return response.final_balance * 0.00000001;
    } catch {
      // ignored
    }
    return 0;
  }

  public async showBalancesAsync(addresses: string[]): Promise<IAddress[]> {
    // tslint:disable
    const balances: IAddress[] = [];
    for (let address of addresses) {
      const balance = await this.showBalanceAsync(address);
      balances.push({ address, balance } as IAddress);
    }
    return balances;
  }
}

interface IResponse {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
}
