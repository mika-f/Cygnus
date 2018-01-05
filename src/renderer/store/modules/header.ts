// tslint:disable:no-shadowed-variable

interface IState {
  balance: number;
  isShowAddressModal: boolean;
}

const state: IState = {
  balance: 0.0,
  isShowAddressModal: false
};

const mutations = {
  UPDATE_BALANCE(state: IState, balance: number): void {
    state.balance = balance;
  },
  SHOW_ADDRESS_MODAL(state: IState): void {
    state.isShowAddressModal = true;
  },
  HIDE_ADDRESS_MODAL(state: IState): void {
    state.isShowAddressModal = false;
  }
};

const actions = {
  updateBalance({ commit }, balance: number): void {
    commit("UPDATE_BALANCE", balance);
  },
  showAddressModal({ commit }): void {
    commit("SHOW_ADDRESS_MODAL");
  },
  hideAddressModal({ commit }): void {
    commit("HIDE_ADDRESS_MODAL");
  }
};

const getters = {
  balance: (state: IState): number => {
    return state.balance;
  },
  isShowAddressModal: (state: IState): boolean => {
    return state.isShowAddressModal;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
