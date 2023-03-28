<template>
  <div class="about">
    <h1>This is an tab test page - {{ message }}</h1>
  </div>
  <div class="tabs">
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one">Item One</v-tab>
        <v-tab value="two">Item Two</v-tab>
        <v-tab value="three">Item Three</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <TabView01 msg="Welcome to Your TabView01 Tab!" />
          </v-window-item>
          <v-window-item value="two">
            <TabView02 msg="Welcome to Your TabView02 Tab!" />
          </v-window-item>
          <v-window-item value="three">
            <TabView03 msg="Welcome to Your TabView03 Tab!" />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
// Referencias...
// https://bootstrap-vue.org/docs/components/tabs
// https://vuetifyjs.com/en/getting-started/installation/
// sudo npm install

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
const bootstrap = require("bootstrap");

// @ is an alias to /src
import TabView01 from "@/../adm/src/components/reserva/TabView01.vue";
import TabView02 from "@/../adm/src/components/reserva/TabView02.vue";
import TabView03 from "@/../adm/src/components/reserva/TabView03.vue";

export default {
  name: "TabView",
  components: {
    TabView01,
    TabView02,
    TabView03,
  },
  data: () => ({
    message: "TabTest",
    tab: null,
  }),

  // data() {
  //   return {
  //     info: "Conheça nossos pratos",
  //     message: "TabTest",
  //   };
  // },
  methods: {
    abreTab() {
      var tab = new bootstrap.Tab(document.querySelector("#nav-tabs"), {
        keyboard: false,
      });
      return tab;
    },
  },
  setup() {},
};
</script>
