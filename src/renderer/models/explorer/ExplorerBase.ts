import axios from "axios";
import { IAddress } from "../IAddress";

export abstract class ExplorerBase {
  protected baseUrl: string;
  protected isNeedProxy: boolean = false;

  public abstract showBalanceAsync(address: string): Promise<number>;

  public abstract showBalancesAsync(addresses: string[]): Promise<IAddress[]>;

  protected async getAsync<T>(url: string): Promise<T> {
    if (this.isNeedProxy) {
      url = `https://proxy.mochizuki.moe/${url}`; // Access-Control-Allow-Origin: *
    }
    const response = await axios.get(url, {
      headers: {
        "X-Requested-With": "Cygnus/1.0.0"
      }
    });
    if (response.status === 200) {
      // tslint:disable-next-line
      console.log(response.data);
      return response.data as T;
    } else {
      throw new Error(`Status: ${response.status} / Text: ${response.statusText}`);
    }
  }
}
