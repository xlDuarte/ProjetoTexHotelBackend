// modulo servicos.js

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
      commit("setData",response.data)
      console.log("Executei api getServicos...", response.data);
      // this.items = response.data;
      // console.log("getServicos", this.items);
      // return response.data;
    },

    // async getData({ commit }) {
    //   //const data = await fetch("https://api.chucknorris.io/jokes/random");
    //   const data = await fetch("http://localhost:5000/servico");
    //   console.log("Data:",data)
    //   commit("setData", await data.json());
    //   console.log("Executei api getServicos...",data);
    // },
  },
};
