import axios from "axios";

export abstract class ExplorerBase {
  protected baseUrl: string;

  public abstract showBalanceAsync(address: string): Promise<number>;

  public abstract showBalancesAsync(addresses: string[]): Promise<number[]>;

  protected async getAsync<T>(url: string): Promise<T> {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data as T;
    } else {
      throw new Error(`Status: ${response.status} / Text: ${response.statusText}`);
    }
  }
}
