// tslint:disable:no-shadowed-variable
import axios from "axios";

import { ITicker } from "../../models/ITicker";

interface IState {
  data: ITicker[];
  isLoaded: boolean;
}

const state: IState = {
  data: [],
  isLoaded: false
};

const mutations = {
  LOAD_CURRENCIES(state: IState, currencies: ITicker[]): void {
    state.data = currencies;
    state.isLoaded = true;
  }
};

const actions = {
  async loadCurrencies({ commit }) {
    const response = await axios.get("https://api.coinmarketcap.com/v1/ticker/?convert=JPY&limit=0");
    if (response.status === 200) {
      commit("LOAD_CURRENCIES", response.data.map((w) => w as ITicker));
    }
  }
};

const getters = {
  tickers: (state: IState): ITicker[] => {
    return state.data;
  },
  isTickersLoaded: (state: IState): boolean => {
    return state.isLoaded;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
