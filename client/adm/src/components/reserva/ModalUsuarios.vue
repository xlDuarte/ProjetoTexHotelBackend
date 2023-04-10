<template>
  <!-- Modal Servicos2 -->
  <div class="modal" tabindex="-1" id="modalUsuarios">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <p>Mensagem sistema: {{ msg }}</p>
            <hr />
          </div>
          <!-- INÍCIO DO CONTEÚDO ajustado para trazer da store...-->
          <h2>Clientes registrados no hotel</h2>
          <hr />
          <div class="grid-container">
            <div v-for="(item, index) in items" :key="index" class="grid-item">
              <h4><b>ID Usuário: {{ item.idUsuario }} </b> - {{ item.nomeUsuario }}</h4>
              <p><b>eMail: {{ item.emailUsuario }} Telefone: {{ item.telefoneUsuario }} </b> - Status: {{ item.statusUsuario }}</p>
            </div>
          </div>
        </div>
        <!-- FINAL DO CONTEÚDO -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Fechar
        </button>
      </div>
    </div>
  </div>
  <!-- Fim Modal Usuarios -->
</template>

<script>
var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
const bootstrap = require("bootstrap");

// import { Reservas } from "@/../adm/src/types/reservas/Reservas.js";
import { mapState } from "vuex";

// import axios
// import axios from "axios";

export default {
  name: "ModalUsuarios",
  props: {
    // properties que vem da view que irá chamar o componente...
    msg: String,
    items: Object,
  },
  data() {
    return {
      // informações que podem ser utilizadas no template...
      // arrayServicos: [],
      items2: [
        {
          title: "Item 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          title: "Item 2",
          description:
            "Praesent euismod auctor dolor, eu suscipit ipsum efficitur quis.",
        },
        {
          title: "Item 3",
          description:
            "Nulla facilisi. Suspendisse malesuada, nunc ut vulputate bibendum.",
        },
        {
          title: "Item 4",
          description:
            "Fusce hendrerit massa elit, sed commodo nisi laoreet eu.",
        },
        {
          title: "Item 5",
          description:
            "Vestibulum sollicitudin, nisl at fermentum pellentesque.",
        },
        {
          title: "Item 6",
          description:
            "Morbi in nibh eu metus pharetra eleifend. Nam malesuada.",
        },
      ],
    };
  },
  ready() {
    console.log("Created modalUsuarios - ready(): ");
  },
  setup() {
    //
    console.log("Created modalUsuarios - setup(): ");
  },
  created() {
    //
    console.log("Created modalUsuarios - created(): ");
  },
  watch() {
    // não utilizado...
    console.log("Created modalUsuarios - watch(): ");
  },
  methods: {
    abreModal() {
      console.log("abreModal modalUsuarios ");
      var modal = new bootstrap.Modal(
        document.querySelector("#modalUsuarios"),
        {
          keyboard: false,
        }
      );
      return modal;
    },
    alerta() {
      //
    },

    // somente para teste...
    Servicos2Data() {
      console.log("Servicos2Data...click!");
    },
  },
  computed: {
    ...mapState(["Servicos2"]),
  },

  mounted() {
    // carrega servicos para a store...
    // this.Servicos2Data();
    // this.JokeData();
  },
};
</script>

<style scoped>
.modal-body {
  color: black;
}

.listUsuarios {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
}

.grid-item {
  background-color: #f4c18e;
  border: 1px solid #ccc;
  padding: 20px;
}

</style>
