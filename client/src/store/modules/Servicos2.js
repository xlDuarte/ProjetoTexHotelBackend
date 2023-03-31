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
      console.log("Executei api getServicos...", response.data);
      // this.items = response.data;
      // console.log("getServicos", this.items);
      // return response.data;
    },
  },
};

/*
Assuming you are using Vuex to manage your Vue.js application state, you can change values in the store dynamically by dispatching actions that mutate the state. 
Here's an example of how you can do this:
store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    value: 0
  },
  mutations: {
    setValue(state, payload) {
      state.value = payload;
    }
  },
  actions: {
    updateValue({ commit }, payload) {
      commit('setValue', payload);
    }
  }
});

export default store;

In this example, the Vuex store has a value property in its state, which can be changed by dispatching the updateValue action, which in turn commits the setValue mutation to change the value.
To change the value dynamically from a component, you can dispatch the updateValue action from a method in the component, like this:

<template>
  <div>
    <p>Value: {{ $store.state.value }}</p>
    <button @click="changeValue">Change Value</button>
  </div>
</template>

<script>
export default {
  methods: {
    changeValue() {
      const newValue = Math.random(); // or any other value you want
      this.$store.dispatch('updateValue', newValue);
    }
  }
};
</script>

*/
