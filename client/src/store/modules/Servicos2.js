// modulo Servicos2.js
import axios from "axios";

export default {
  namespaced: true,
  state: {
    info: "",
  },
  getters: {
    data: (state) => state.info,
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
  },
  actions: {
    async getData({ commit }) {
      const response = await axios.get("http://localhost:5000/servico");
      commit("setData", response.data);
      // return response.data;
    },
  },
};

