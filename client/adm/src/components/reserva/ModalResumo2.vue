<template>
  <!-- Inicio Modal Resummo2 -->
  <div
    class="modal fade"
    id="modalResumo2"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
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
          <!-- INÍCIO DO CONTEÚDO -->
          <!-- inicio div Resumo -->
          <div id="bodyResumo">
            <h1>Resumo da solicitação</h1>
            <h4>Mensagens do sistema: {{ msg }}</h4>
            <p></p>
            <h2>ID da Reserva: {{ idReservas }}</h2>
            <h2>Status Reserva: {{ itemReservas.statusReserva }}</h2>
            <hr />
            <h3>Dados Reserva</h3>
            <p>
              Nome Hóspede: {{ itemReservas.nomeUsuario }} - ID:
              {{ itemReservas.usuario_idUsuario }}
            </p>
            <p>Data Reserva: {{ formatDataReserva }}</p>
            <p>Checkin: {{ formatDataEntrada }}</p>
            <p>Checkout: {{ formatDataSaida }}</p>
            <p>Acomodação: {{ itemReservas.nomeAcomodacao }}</p>
            <p>Vlr Diaria: {{ itemReservas.valorAcomodacao }}</p>
            <p>Qt Hóspedes: {{ itemReservas.qtdHospedesReserva }}</p>
            <p>
              <b>Qt Diárias: {{ itemReservas.qtDiarias }} </b>
            </p>
            <p></p>
            <!-- <h2>Diárias</h2> -->
            <div id="diarias"></div>
            <hr />
            <h3>Serviços Adicionais</h3>
            <div
              class="painelServicos"
              v-for="item in this.arrayServicosBD.data"
              :key="item"
            >
              <input
                type="checkbox"
                v-model="item.isSelected"
                @change="changeServico(item.isSelected, item)"
                :id="item.idServicos"
                :name="item.nomeServico"
                :value="item"
                :disabled="true"
              />
              <label
                >{{ item.descricaoServico }} - R$ {{ item.vlrDiariaServico }},00
              </label>
              <br />
            </div>
            <hr />
            <div id="total">
              <h3>Resumo Valores</h3>
              <p>Valor Reserva: {{ itemReservas.valorReserva }}</p>
              <p></p>
              <p>Valor Serviços: {{ itemReservas.valorTotalServicos }}</p>
              <p></p>
              <p>
                <b>Valor Total Geral: {{ formatValorTotalDesconto }}</b>
              </p>
            </div>
            <hr />
          </div>
          <!-- Inicio area de botões -->
          <!-- <div id="footer">
            <div class="mt-2 pt-2 d-flex flex-start"></div>
            <div id="geraPDF">
              <button class="btn btn-secondary" @click="geraPDF">
                Gera PDF
              </button>
            </div>
            <hr />
          </div> -->
        </div>
      </div>
      <!-- Fim body Resumo-->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Fechar
        </button>
      </div>
      <!-- fim modal -->
    </div>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
const bootstrap = require("bootstrap");

// import { Reservas } from "@/../adm/src/types/reservas/Reservas.js";
// import { preencheModalResumo } from "./FormReserva.vue";
// import { cupomDesconto } from "../src/components/reserva/FormReserva.vue";
// import { gravaReserva } from "../src/components/reserva/FormReserva.vue";
// import { updateBindingForm } from "../src/components/reserva/FormReserva.vue";

import moment from "moment";
import { mapState } from "vuex";

// import axios
// import axios from "axios";

var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

export default {
  name: "ModalResumo2",
  // props: {
  //   msg: String, idReserva: Array,
  // },
  props: {
    msg: String,
    idReservas: [String, Number],
    itemReservas: [Array, Object],
    arrayServicosBD: Object,
  },
  data() {
    return {
      // informações que podem ser utilizadas no template...
      cupomDesconto: localStorage.getItem("cupomDesconto"),
      totalGeralDesconto: localStorage.getItem("vlrTotalDesconto"),
      item: this.itemReservas,
    };
  },
  methods: {
    formatData(data) {
      return moment(data, "DD/MM/YYYY").format("DD-MM-YYYY");
    },

    formatCurrency(dateObj) {
      return `R$ ${dateObj}`;
    },

    abreModal() {
      // console.log("Abre Modal Item: ", this.item);
      var modal = new bootstrap.Modal(document.querySelector("#modalResumo2"), {
        keyboard: false,
      });
      return modal;
    },
  },

  computed: {
    ...mapState(["Servicos2"]),
    formatDataReserva() {
      const dateObj = new Date(this.itemReservas.dataReserva);
      return this.formatData(dateObj);
    },
    formatDataEntrada() {
      const dateObj = new Date(this.itemReservas.dataEntradaReserva);
      return this.formatData(dateObj);
    },
    formatDataSaida() {
      const dateObj = new Date(this.itemReservas.dataSaidaReserva);
      return this.formatData(dateObj);
    },
    formatValorTotalDesconto() {
      const dateObj = this.itemReservas.valorTotalDesconto;
      return this.formatCurrency(dateObj);
    },
  },

  mounted() {
    // atualiza dados da modalResumo2
  },
};
</script>

<style scoped>
.modal-dialog {
  margin: 10vh auto 0px auto;
}

* {
  color: black;
}

h1 {
  font-size: 50px;
  margin: 20px 0 0;
  color: rgb(51, 2, 246);
}

h2 {
  font-size: 30px;
  margin: 20px 0 0;
  color: rgb(51, 2, 246);
}

h3 {
  font-size: 25px;
  margin: 20px 0 0;
  color: rgb(51, 2, 246);
}

h4 {
  font-size: 20px;
  margin: 20px 0 0;
  color: rgb(246, 2, 63);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #2304ed;
}

p {
  color: rgb(6, 6, 6);
  line-height: 15px;
  /* within paragraph */
  margin-bottom: 10px;
  /* between paragraphs */
  font-size: 20px;
}
</style>
