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
            <h3>Resumo da solicitação {{ msg }}</h3>
            <p></p>
            <p>ID da Reserva: {{ idReservas }}</p>
            <p>Status Reserva: {{ itemReservas.statusReserva }}</p>
            <hr />
            <p>Dados Reserva</p>
            <p>
              Nome Hóspede: {{ itemReservas.nomeUsuario }} - ID:
              {{ itemReservas.usuario_idUsuario }}
            </p>
            <p>Data Reserva: {{ itemReservas.dataReserva }} </p>
            <p>Data Reserva: {{ formatDataReserva }} </p>
            <p>Checkin: {{ formatDataEntrada }} </p>
            <p>Checkout: {{ formatDataSaida }}  </p>
            <p>
              Acomodação: {{ itemReservas.nomeAcomodacao }} Vlr Diaria
              Acomodação: {{ itemReservas.valorAcomodacao }} Qt Hóspedes:
              {{ itemReservas.qtdHospedesReserva }}
            </p>
            <p></p>
            <!-- <h2>Diárias</h2> -->
            <div id="diarias"></div>
            <hr />
            <h2>Servicos Adicionais</h2>
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
                :disabled="servicosSelection"
              />
              <label
                >{{ item.descricaoServico }} - R$ {{ item.vlrDiariaServico }},00
              </label>
              <br />
            </div>
            <hr />
            <div id="total">
              <h2>Resumo Valores</h2>
              <p>Valor Reserva: {{ itemReservas.valorReserva }}</p>
              <p></p>
              <p>Valor Serviços: {{ itemReservas.valorTotalServico }}</p>
              <p></p>
              <p>Valor Total Geral: {{ itemReservas.valorTotalDesconto }}</p>
            </div>
            <hr />
          </div>
          <!-- Inicio body confirma-->
          <div id="footer">
            <div class="mt-2 pt-2 d-flex flex-start"></div>
            <div id="geraPDF">
              <!-- <button class="btn btn-secondary" @click="geraPDF">
                Gera PDF
              </button> -->
            </div>
            <hr />
          </div>
        </div>
      </div>          <!-- Fim body Resumo-->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Fechar
        </button>
        <!-- <button type="button" id="btnConfirma" class="btn btn-secondary">
          Confirma!
        </button> -->
        <!-- <a data-dismiss="modal" data-toggle="modal" href="#modalConfirma"
          >Click</a
        > -->
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


// let dtReserva = moment(arrayReservaCriada[0].dtReserva,"DD/MM/YYYY").format("YYYY-MM-DD");
// let dtEntrada = moment(arrayReservaCriada[0].dtEntrada,"DD/MM/YYYY").format("YYYY-MM-DD");
// let dtSaida = moment(arrayReservaCriada[0].dtSaida, "DD/MM/YYYY").format("YYYY-MM-DD");


export default {
  name: "ModalResumo2",
  // props: {
  //   msg: String, idReserva: Array,
  // },
  props: {
    msg: String,
    idReservas: [String,Number],
    itemReservas: [Array,Object],
    arrayServicosBD: Object,
    servicosSelection: Boolean,
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
      return moment(data,"DD/MM/YYYY").format("DD-MM-YYYY");
    },
    abreModal() {
      // console.log("Abre Modal Item: ", this.item);
      var modal = new bootstrap.Modal(document.querySelector("#modalResumo2"), {
        keyboard: false,
      });
      return modal;
    },
    confirmaReserva() {
      console.log("Cliquei na confirmação...");
      alert(
        "Sua reserva foi confirmada - você irá receber um email com a confirmação! Obrigado!"
      );
      // gravaReserva();
      // updateBindingForm();
      window.$("#modalResumo").modal("hide");
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
  },

  mounted() {
    // atualiza dados da modalResumo2
  },
};

window.$().ready(function () {
  // confirmação da reserva...
  window.$("#btnConfReserva").click(function () {
    console.log("Cliquei na confirmação...");
    console.log("Teste...");
    // verifica se desconto foi utilizado, para mudar flag de aplicar desconto...
    if (
      localStorage.getItem("vlrTotalGeral") !=
      localStorage.getItem("vlrTotalDesconto")
    ) {
      localStorage.setItem("cupomDescontoValido", "NOK");
    } else {
      localStorage.setItem("cupomDescontoValido", "OK");
    }
  });

  // aplica cupom...
  window.$("#btnCupom").click(function () {
    let cupomEntry = document
      .querySelector("#inputDesconto")
      .value.toLowerCase();
    let cupomStorage = localStorage.getItem("cupomDesconto");
    let vlrTotalGeral = localStorage.getItem("valorTotalGeral").split("$");
    let percDesc = 1;
    let msg = "Total Reserva....: R$ "; //${localStorage.getItem("valorTotalGeral")}`;

    if (localStorage.getItem("cupomDescontoValido") == "OK") {
      // tem direito a usar o cupom...
      if (cupomEntry == cupomStorage) {
        percDesc = 0.9;
        msg = "Total Reserva com desconto....: R$ ";
      } else {
        alert("Cupom inválido");
        document.getElementById("inputDesconto").value = "";
      }
    } else {
      // não pode mais usar o cupom...
      alert("Este cupom já foi utilizado ou não é mais válido...");
    }

    let desconto = parseFloat(vlrTotalGeral[1].replace(".", "")) * percDesc;
    console.log("VlrTotalDesconto", desconto);
    localStorage.setItem("vlrTotalDesconto", `R$ ${desconto.toFixed(2)}`);
    let msg2 = `${msg} ${desconto.toFixed(2)}`;
    document.getElementById("totalDesconto").innerText = msg2;
  });
});
</script>

<style scoped>
* {
  color: black;
}

h3 {
  font-size: 20px;
  margin: 20px 0 0;
  color: red;
}

h2 {
  font-size: 15px;
  margin: 20px 0 0;
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
  color: brown;
  line-height: 10px;
  /* within paragraph */
  margin-bottom: 10px;
  /* between paragraphs */
  font-size: 15px;
}
</style>
