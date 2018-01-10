import { ADDRESSES_PATH, ROOT_PATH } from "../../models/constants";
import { ISupportCurrency, resolveFromId } from "../../models/currencies";
import { IAddress } from "../../models/IAddress";
import { readFile, writeFile } from "../../models/io";
import { ITrackCurrency } from "../../models/ITrackCurrency";

// tslint:disable:no-shadowed-variable

interface IState {
  currencies: ITrackCurrency[];
}

function getCurrency(state: IState, id: string): ITrackCurrency {
  return state.currencies.find((w) => w.id === id) as ITrackCurrency;
}

function getAddress(currency: ITrackCurrency, address: string): IAddress {
  return currency.addresses.find((w) => w.address === address) as IAddress;
}

const state: IState = {
  currencies: []
};

const mutations = {
  REGISTER_CURRENCY(state: IState, { address, id }): void {
    state.currencies.push({
      addresses: [{ address, balance: 0 } as IAddress],
      id
    } as ITrackCurrency);
  },
  REGISTER_ADDRESS(state: IState, { address, id }): void {
    getCurrency(state, id).addresses.push({ address, balance: 0 } as IAddress);
  },
  RESTORE_CURRENCY(state: IState, trackCurrency: ITrackCurrency): void {
    state.currencies.push(trackCurrency);
  },
  UNREGISTER_CURRENCY(state: IState, { id }): void {
    state.currencies = state.currencies.filter((w) => w.id !== id);
  },
  UNREGISTER_ADDRESS(state: IState, { address, id }): void {
    const addresses = getCurrency(state, id).addresses;
    getCurrency(state, id).addresses = addresses.filter((w) => w.address !== address);
  },
  UPDATE_BALANCE(state: IState, { address, balance, id }): void {
    getAddress(getCurrency(state, id), address).balance = balance;
  }
};

const actions = {
  registerAddress({ commit, state }: { commit: any, state: IState }, { address, id }): void {
    if (state.currencies.find((w) => w.id === id)) {
      const trackCurrency = getCurrency(state, id);
      if (trackCurrency.addresses.find((w) => w.address === address) === undefined) {
        commit("REGISTER_ADDRESS", { address, id });
        writeFile(ADDRESSES_PATH, JSON.stringify(state.currencies || "[]"));
      }
    } else {
      commit("REGISTER_CURRENCY", { address, id });
      writeFile(ADDRESSES_PATH, JSON.stringify(state.currencies || "[]"));
    }
  },
  loadAddresses({ commit }): void {
    const content = readFile(ADDRESSES_PATH);
    if (content === "") {
      return;
    }
    const json = JSON.parse(content) as ITrackCurrency[];
    json.forEach((w) => {
      commit("RESTORE_CURRENCY", w);
    });
  },
  async updateBalances({ commit, state }: { commit: any, state: IState }, id: string): Promise<void> {
    const trackCurrency = getCurrency(state, id);
    const currencyWithSolver = resolveFromId(id);
    if (currencyWithSolver) {
      const balances = await currencyWithSolver.solver.showBalancesAsync(trackCurrency.addresses.map((w) => w.address));
      balances.forEach((w) => {
        // tslint:disable-next-line
        console.log(`UPDATE_BALANCE with {address: ${w.address}, balance: ${w.balance}}`);
        commit("UPDATE_BALANCE", { address: w.address, balance: w.balance, id });
      });
    }
  }
};

const getters = {
  currencies: (state: IState): ITrackCurrency[] => {
    return state.currencies;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
