<template>
  <!-- Modal Usuarios -->
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
          <h2>Clientes cadastrados no hotel</h2>
          <hr />
          <div class="grid-container">
            <!-- <div v-for="(item, index) in items" :key="index" class="grid-item" @click="selecionaUser(item.idUsuario,item)" > -->
            <!-- @click="selecionaUser(item.idUsuario, item)" -->
            <!-- @click="mudarFavorito(item.idUsuario, item)" -->
            <div
              v-for="(item, index) in items"
              :key="index"
              class="grid-item"
              @click="mudarFavorito(item.idUsuario, item)"
            >
              <h4>
                <b v-if="favorito">ID Usuário: {{ item.idUsuario }}</b> -
                {{ item.nomeUsuario }}
              </h4>
              <p>
                <b
                  >eMail: {{ item.emailUsuario }} Telefone:
                  {{ item.telefoneUsuario }}
                </b>
                - Status: {{ item.statusUsuario }}
              </p>
              <!-- <button
                class="btn btn-secondary"
                @click="selecionaUser(item.idUsuario, item)"
              >
                Seleciona
              </button> -->
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
// https://www.webmound.com/pass-data-child-to-parent-vue/

var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
const bootstrap = require("bootstrap");

// import { Reservas } from "@/../adm/src/types/reservas/Reservas.js";
import { mapState } from "vuex";
// import { defineEmits } from "vue";
import { ref } from "vue";

// import axios
// import axios from "axios";

// const emit = defineEmits(["updateID"]);
// const returnID = (idUsuario) => emit("updateID", idUsuario);

export default {
  name: "ModalUsuarios",
  emits: ["selecionado"],
  props: {
    // properties que vem da view que irá chamar o componente...
    msg: String,
    items: [String, Object],
  },
  setup(prop, { emit }) {
    //
    console.log("Created modalUsuarios - setup(): ");
    const favorito = ref(true);

    function mudarFavorito(idUsuario, item) {
      //favorito.value = !favorito.value
      if (favorito.value) {
        emit("selecionado", idUsuario);
        console.log("emits...", idUsuario, item);
        return;
      }
    }
    //window.$("#modalUsuarios").modal("hide");
    return { mudarFavorito, favorito };
  },
  data() {
    return {
      // informações que podem ser utilizadas no template...
      // arrayServicos: [],
    };
  },
  ready() {
    console.log("Created modalUsuarios - ready(): ");
  },
  created() {
    //
    console.log("Created modalUsuarios - created(): ");
  },
  watch() {
    // não utilizado...
  },
  methods: {
    selecionaUser(idUsuario, item) {
      console.log("Selecionei este hospede", idUsuario, item);
      // this.idUsuario = idUsuario;
      // emit("selecionado", idUsuario);
      window.$("#modalUsuarios").modal("hide");
    },
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
    fechaModal() {
      console.log("abreModal modalUsuarios ");
      var modal = new bootstrap.Modal(
        document.querySelector("#modalUsuarios"),
        {
          keyboard: false,
        }
      );
      modal.hide;
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
