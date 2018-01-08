import { ISupportCurrency } from "../../models/currencies";
import { ITrackAddress } from "../../models/ITrackAddress";

// tslint:disable:no-shadowed-variable

interface IState {
  addresses: ITrackAddress[];
}

const state: IState = {
  addresses: []
};

const mutations = {
  REGISTER_ADDRESS(state: IState, { address, currency }): void {
    state.addresses.push({ address, currency, balance: 0.0 } as ITrackAddress);
  },
  UNREGISTER_ADDRESS(state: IState, { address, currency }): void {
    state.addresses = state.addresses.filter((w) => !(w.address === address && currency === currency));
  },
};

const actions = {
  registerAddress({ commit, state }, { address, currency }): void {
    if (state.addresses.find((w) => w.address === address && w.currency === currency) === undefined) {
      commit("REGISTER_ADDRESS", { address, currency });
    }
  }
};

const getters = {
  addresses: (state: IState): ITrackAddress[] => {
    return state.addresses;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
