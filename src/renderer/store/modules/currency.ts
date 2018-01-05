// tslint:disable:no-shadowed-variable
import axios from "axios";

import { ICurrency } from "../../models/ICurrency";

const state = {
  data: [],
  isLoaded: false
};

const mutations = {
  LOAD_CURRENCIES(state, currencies: ICurrency[]) {
    state.data = currencies;
    state.isLoaded = true;
  }
};

const actions = {
  async loadCurrencies({ commit }) {
    const response = await axios.get("https://api.coinmarketcap.com/v1/ticker/?convert=JPY&limit=0");
    if (response.status === 200) {
      commit("LOAD_CURRENCIES", response.data.map((w) => w as ICurrency));
    }
  }
};

const getters = {
  currencies: (state): ICurrency[] => {
    return state.data as ICurrency[];
  },
  isCurrenciesLoaded: (state): boolean => {
    return state.isLoaded;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
