<template>
  <!-- Inicio Modal Resummo -->
  <div class="modal fade" id="modalResumo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- INÍCIO DO CONTEÚDO -->
          <!-- inicio div Resumo -->
          <div id="bodyResumo">
            <h3>Veja o resumo de sua solicitação!</h3>
            <hr />
            <h2>Diárias</h2>
            <div id="diarias"></div>
            <hr />
            <h2>Servicos Adicionais</h2>
            <div id="servicos"></div>
            <hr />
            <h2>Total</h2>
            <div id="total"></div>
            <hr />
          </div>
          <!-- Fim body Resumo-->
          <!-- Inicio body confirma-->
          <div id="bodyConfirma">
            <h3>Confirme sua reserva</h3>
            <h2>Seu cupom de desconto: {{ cupomDesconto }}</h2>
            <div class="mt-2 pt-2 d-flex flex-start">
              <label for="">Aplicar Cupom de Desconto: </label>
              <input id="inputDesconto" class="w-50 inputPadrao bg-light px-3 text-uppercase fw-bold" type="text" />
              <button id="btnCupom" type="button" class="btn btn-secondary">
                Aplicar Cupom
              </button>

              <button class="btn btn-secondary" @click="confirmaReserva">
                Confirma Reserva
              </button>
              <!-- <button
                id="btnConfReserva"
                type="button"
                class="btn btn-secondary"
              >
                Confirma Reserva
              </button> -->
            </div>
            <hr />
            <p id="totalDesconto"></p>
            <hr />
          </div>
        </div>
        <!-- fim body confirma -->
      </div>
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

//import { preencheModalResumo } from "./FormReserva.vue";
import { cupomDesconto } from "./FormReserva.vue";
import { gravaReserva } from "./FormReserva.vue";
import { updateBindingForm } from "./FormReserva.vue";
import { Reservas } from "@/../adm/src/types/reservas/Reservas.js";
import moment from 'moment';


// gera cupom de desconto caso não exista nenhum. Se já houver a mensagem é que não podem ser gerados dois cupons no mesmo dia...
let msgCupomDesconto = "Lamento, um cupom de desconto já foi utilizado hoje...";
if (localStorage.getItem("cupomDesconto") != "") {
  localStorage.setItem("cupomDesconto", cupomDesconto());
  msgCupomDesconto = localStorage.getItem("cupomDesconto");
} else {
  localStorage.setItem("cupomDesconto", msgCupomDesconto);
}

var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

export default {
  name: "ModalResumo",
  props: {
    // properties que vem da view que irá chamar o componente...
    msg: String,
  },
  data() {
    return {
      // informações que podem ser utilizadas no template...
      cupomDesconto: localStorage.getItem("cupomDesconto"),
      totalGeralDesconto: localStorage.getItem("vlrTotalDesconto"),
    };
  },
  methods: {
    abreModal() {
      var modal = new bootstrap.Modal(document.querySelector("#modalResumo"), {
        keyboard: false,
      });
      return modal;
    },
    confirmaReserva() {
      console.log("Cliquei na confirmação...");
      console.log(
        "Teste...",
        localStorage.getItem("valorTotalGeral") !==
        localStorage.getItem("vlrTotalDesconto")
      );
      console.log(
        "Teste2",
        localStorage.getItem("valorTotalGeral"),
        localStorage.getItem("vlrTotalDesconto")
      );
      if (
        localStorage.getItem("valorTotalGeral") !==
        localStorage.getItem("vlrTotalDesconto")
      ) {
        localStorage.setItem("cupomDescontoValido", "NOK");
      }

      gravaReserva();

      // inserir aqui a persistencia no banco...
      // [{"reservaId":"Reserva_1","dtReserva":"16/03/2023","codCliente":"Hospede1","dtEntrada":"20/03/2023","dtSaida":"24/03/2023",
      // "qtPessoas":"3","tipoApto":"comfort","diarias":"4","vlrTotal":"5520","vlrTotalcomDesconto":"R$ 4968.00","cupom":"aqqrgkz"}]

      let reserva = new Reservas();

      console.log(reserva.getReservasById("36"));
      //obtem dados da reserva feita pelo hospede da localStorage
      let reservaCriada = `Reserva_${localStorage.getItem("reservaId")}`;
      let arrayReservaCriada = JSON.parse(localStorage.getItem(reservaCriada));

      console.log("Reserva criada array...", arrayReservaCriada);
      console.log("Reserva criada array...", arrayReservaCriada[0].reservaId);
      console.log("Reserva criada array...", arrayReservaCriada[0].diarias);

      /*
      Você deve informar para o moment o formato de entrada, ou seja, como está a string com sua data antes de formatá-la pois internamente ele
      fará um parse e chamará um new Date(). 
      Fonte: http://momentjs.com/docs/#/parsing/string/
      var data = moment("02/03/2018", "DD/MM/YYYY");
      //Feito isso basta definir o formato de saída:
      console.log(data.format("YYYY-MM-DD"));
      */

      let idReservas = "";
      let dtReserva = moment(arrayReservaCriada[0].dtReserva, "DD/MM/YYYY").format("YYYY-MM-DD");
      let dtEntrada = moment(arrayReservaCriada[0].dtEntrada, "DD/MM/YYYY").format("YYYY-MM-DD");
      let dtSaida = moment(arrayReservaCriada[0].dtSaida, "DD/MM/YYYY").format("YYYY-MM-DD");
      let vlrTotal = arrayReservaCriada[0].vlrTotal;
      let qtPessoas = arrayReservaCriada[0].qtPessoas;
      let idUsuario = arrayReservaCriada[0].idUsuario;
      let idAcomodacao = "3"; // falta incluir na ls - arrayReservaCriada[0].idAcomodacao;
      let acomodacaoVlrDiaria = 200; // falta inclir na LS - arrayReservaCriada[0].acomodacaoVlrDiaria;
      let tipoApto = arrayReservaCriada[0].tipoApto;
      let diarias = arrayReservaCriada[0].diarias;
      let statusReserva = "Registrada";
      let dataCancelamento = null;
      let motivoCancelamento = "";
      let cupom = arrayReservaCriada[0].cupom;
      let taxaDescontoCupom = arrayReservaCriada[0].taxaDescontoCupom;
      let valorTotalServicos = localStorage.getItem("valorTotalServicos");
      let vlrTotalcomDesconto = arrayReservaCriada[0].vlrTotalcomDesconto;
      let itemArrayReservas = 0; // avaliar, não está mais sendo utilizado...
      let itemArrayEdit = false; //flag de controle se false é uma nova reserva...

      reserva.salvar(
        idReservas,
        dtReserva,
        dtEntrada,
        dtSaida,
        vlrTotal,
        qtPessoas,
        idUsuario,
        idAcomodacao,
        tipoApto,
        acomodacaoVlrDiaria,
        diarias,
        statusReserva,
        dataCancelamento,
        motivoCancelamento,
        cupom,
        taxaDescontoCupom,
        valorTotalServicos,
        vlrTotalcomDesconto,
        itemArrayReservas,
        itemArrayEdit
      );

      alert(
        "Sua reserva foi confirmada - você irá receber um email com a confirmação! Obrigado!"
      );

      // verificar como limpar o selected de serviços para não vir flagado na próxima reserva!!!!
      // clean serviços!!

      updateBindingForm();
      window.$("#modalResumo").modal("hide");
    },
  },
  computed: {},
  mounted() {
    // atualiza dados da modalResumo
    // preencheModalResumo();
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
    let vlrTotalGeral = localStorage.getItem("valorTotalGeral");
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

    // let desconto = parseFloat(vlrTotalGeral[1].replace(".", "")) * percDesc;
    let desconto = vlrTotalGeral * percDesc;
    console.log("VlrTotalDesconto", desconto);
    localStorage.setItem("vlrTotalDesconto", desconto.toFixed(2));
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
