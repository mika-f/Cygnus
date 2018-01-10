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
  SHOW_ADDRESS_MODAL(state: IState): void {
    state.isShowAddressModal = true;
  },
  HIDE_ADDRESS_MODAL(state: IState): void {
    state.isShowAddressModal = false;
  }
};

const actions = {
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
