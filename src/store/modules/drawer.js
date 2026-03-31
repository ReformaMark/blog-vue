// src/store/modules/user.js

const drawerModule = {
  state: {
    drawer: false,
  },
  mutations: {
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
  },
  getters: {
    DRAWER: (state) => state.drawer,
  },
  actions: {
  }
};

export default drawerModule;
