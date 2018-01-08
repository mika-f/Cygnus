import { ADDRESSES_PATH, ROOT_PATH } from "../../models/constants";
import { ISupportCurrency } from "../../models/currencies";
import { IAddress } from "../../models/IAddress";
import { readFile, writeFile } from "../../models/io";
import { ITrackCurrency } from "../../models/ITrackCurrency";

// tslint:disable:no-shadowed-variable

interface IState {
  currencies: ITrackCurrency[];
}

const state: IState = {
  currencies: []
};

const mutations = {
  REGISTER_CURRENCY(state: IState, { address, id }): void {
    state.currencies.push({
      addresses: [{ address } as IAddress],
      id
    } as ITrackCurrency);
  },
  REGISTER_ADDRESS(state: IState, { address, id }): void {
    (state.currencies.find((w) => w.id === id) as ITrackCurrency).addresses.push({ address } as IAddress);
  },
  RESTORE_CURRENCY(state: IState, trackCurrency: ITrackCurrency): void {
    state.currencies.push(trackCurrency);
  },
  UNREGISTER_CURRENCY(state: IState, { id }): void {
    state.currencies = state.currencies.filter((w) => w.id !== id);
  },
  UNREGISTER_ADDRESS(state: IState, { address, id }): void {
    const addresses = (state.currencies.find((w) => w.id === id) as ITrackCurrency).addresses;
    (state.currencies.find((w) => w.id === id) as ITrackCurrency).addresses = addresses.filter((w) => w.address !== address);
  }
};

const actions = {
  registerAddress({ commit, state }: { commit: any, state: IState }, { address, id }): void {
    if (state.currencies.find((w) => w.id === id)) {
      const trackCurrency = state.currencies.find((w) => w.id === id) as ITrackCurrency;
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
