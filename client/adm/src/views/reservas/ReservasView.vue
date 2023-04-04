<template>
  <div class="main">
    <!-- para substituir as modals por tabs, ficaria melhor - testar caso haja tempo -->
    <!-- <div class="tabs">
      <v-card>
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="reserva">Reserva</v-tab>
          <v-tab value="servicos">Servicos</v-tab>
          <v-tab value="resumo">Resumo</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="reserva">
              <TabViewReserva msg="Tab Reserva!" />
            </v-window-item>
            <v-window-item value="servicos">
              <TabViewServicos msg="Welcome to Your TabView02 Tab!" />
            </v-window-item>
            <v-window-item value="resumo">
              <TabViewResumo msg="Welcome to Your TabView03 Tab!" />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </div> -->

    <div class="modalServicos2">
      <ModalServicos2
        :msg="msgModalServicos2"
        :idReservas="this.item.idReservas"
        :arrayServicosBD="arrayServicosBD"
        :botaoModalServicos="botaoModalServicos"
      />
    </div>
    <div class="modalResumo2">
      <ModalResumo2
        :msg="msgModalResumo"
        :idReservas="idReservasModalResumo"
        :itemReservas="itemReservaModalResumo"
      />
    </div>
    <div class="sec">
      <div class="text-center">
        <h2>CADASTRO DE RESERVAS</h2>
        <p>*Campos de preenchimento obrigatório.</p>
      </div>

      <div class="shadow container bg-light rounded-3 p-4 mx-auto my-5 w-50">
        <p id="msgAlerta">{{ msgAlerta }}</p>
        <hr />
        <form class="formReservas" action="" @submit.prevent>
          <div class="container">
            <div class="row my-2">
              <div class="col col-5 w-25">
                <label for="dataReserva" class="d-block fw-bold"
                  >*Data da reserva</label
                >
                <input
                  type="date"
                  id="dataReserva"
                  v-model="dataReserva"
                  placeholder="Data da reserva"
                  class="form-control w-75 ms-1"
                  :disabled="camposAtivos"
                />
              </div>
              <div class="col col-5 w-25">
                <label for="dataEntradaReserva" class="d-block fw-bold"
                  >*Data de Checkin</label
                >
                <input
                  type="date"
                  id="descricao"
                  v-model="dataEntradaReserva"
                  placeholder="Data Checkin Reserva"
                  class="form-control w-75 ms-1"
                  :disabled="camposAtivos"
                />
              </div>
              <div class="col col-5 w-25">
                <label for="dataSaidaReserva" class="d-block fw-bold"
                  >*Data de Checkout</label
                >
                <input
                  type="date"
                  id="label"
                  v-model="dataSaidaReserva"
                  placeholder="Data Checkout Reserva"
                  class="form-control w-75 ms-1"
                  :disabled="camposAtivos"
                />
              </div>
              <div class="col col-5 w-25">
                <label for="qtdHospedesReserva" class="d-block fw-bold"
                  >*Qtd Hospedes</label
                >
                <input
                  type="number"
                  id="qtdHospedesReserva"
                  v-model.number="qtdHospedesReserva"
                  placeholder="Qtd Hospedes"
                  class="form-control w-75 ms-1"
                  min="1"
                  :disabled="camposAtivos"
                />
              </div>

              <div class="col col-3">
                <label
                  for="statusReserva"
                  class="mt-3 d-block fw-bold"
                  v-if="itemArrayEdit"
                  >*Status Reserva</label
                >
                <!-- <input
                  type="text"
                  id="statusReserva"
                  v-model="statusReserva"
                  placeholder="Status da Reserva"
                  class="form-control"
                  v-if="itemArrayEdit"
                  :disabled="camposAtivos"
                /> -->

                <select
                  id="statusReserva"
                  v-model="statusReserva"
                  placeholder="Status da Reserva"
                  class="form-control ms-1 w-75"
                  v-if="itemArrayEdit"
                  :disabled="camposAtivos"
                >
                  <option value="Registrada">Registrada</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="Encerrada">Encerrada</option>
                  <option value="Cancelada">Cancelada</option>
                  <option value="Excluída">Excluída</option>
                </select>
              </div>
              <div class="mt-3 col col-4">
                <label
                  for="dataCancelamento"
                  class="d-block fw-bold"
                  v-if="itemArrayEdit"
                  ><small>Data cancelamento</small></label
                >
                <input
                  type="date"
                  id="dataCancelamento"
                  v-model="dataCancelamento"
                  placeholder="Data cancelamento reserva"
                  class="form-control w-50"
                  v-if="itemArrayEdit"
                  :disabled="true"
                />
              </div>

              <div class="mt-3 col col-5">
                <label
                  for="motivoCancelamento"
                  class="d-block fw-bold"
                  v-if="itemArrayEdit"
                  ><small>Motivo cancelamento</small></label
                >
                <input
                  type="text"
                  id="motivoCancelamento"
                  v-model="motivoCancelamento"
                  placeholder="Motivo cancelamento"
                  class="form-control me-auto w-75"
                  v-if="itemArrayEdit"
                  :disabled="camposAtivos"
                />
              </div>
            </div>

            <div class="container">
              <div class="row my-2 mt-3">
                <div class="col col-5 me-5">
                  <label for="idUsuario" class="d-block fw-bold"
                    >ID Usuario</label
                  >
                  <input
                    type="number"
                    id="idUsuario"
                    v-model.number="idUsuario"
                    placeholder="id do Usuario"
                    class="form-control"
                    @change="changeUserId"
                    :disabled="campoAtivoIdUsuario"
                  />
                  <input
                    type="text"
                    id="nomeUsuario"
                    v-model="nomeUsuario"
                    placeholder="Nome Usuario"
                    class="form-control"
                    :disabled="true"
                  />
                </div>
                <div class="col col-5 mx-auto">
                  <label for="idAcomodacao" class="d-block fw-bold"
                    >ID Acomodacao</label
                  >
                  <input
                    type="number"
                    id="idAcomodacao"
                    v-model.number="idAcomodacao"
                    placeholder="id da Acomodacao"
                    class="form-control"
                    @change="changeAcomodacaoId"
                    :disabled="camposAtivos"
                  />
                  <input
                    type="text"
                    id="acomodacaoTipo"
                    v-model="acomodacaoTipo"
                    placeholder="Tipo Acomodação"
                    class="form-control"
                    :disabled="true"
                  />
                  <input
                    type="text"
                    id="acomodacaoVlrDiaria"
                    v-model="acomodacaoVlrDiaria"
                    placeholder="Vlr Diaria Acomodação"
                    class="form-control"
                    :disabled="true"
                  />
                  <label for="qtDiarias" class="d-block fw-bold"
                    >Qtdade Diarias</label
                  >
                  <input
                    type="text"
                    id="qtDiarias"
                    v-model="qtDiarias"
                    placeholder="Qtdade Diarias"
                    class="form-control"
                    :disabled="true"
                  />
                  <label for="cupom" class="d-block fw-bold"
                    >Cupom Desconto</label
                  >
                  <input
                    type="text"
                    id="cupom"
                    v-model="cupom"
                    placeholder="Cupom desconto"
                    class="form-control"
                    :disabled="true"
                  />
                </div>

                <div class="col col-5 me-5">
                  <label for="valorReserva" class="d-block fw-bold"
                    >Valor Total Diarias</label
                  >
                  <input
                    type="number"
                    id="valorReserva"
                    v-model.number="valorReserva"
                    placeholder="Valor das Diarias"
                    class="form-control"
                    :disabled="true"
                  />
                  <label for="valorTotalServicos" class="d-block fw-bold"
                    >Valor Total Serviços</label
                  >
                  <input
                    type="number"
                    id="valorTotalServicos"
                    v-model.number="valorTotalServicos"
                    placeholder="Valor dos Serviços"
                    class="form-control"
                    :disabled="true"
                  />
                  <label for="valorTotalDesconto" class="d-block fw-bold"
                    >Valor Total Reserva</label
                  >
                  <input
                    type="number"
                    id="valorTotalDesconto"
                    v-model.number="valorTotalDesconto"
                    placeholder="Valor Total Reserva"
                    class="form-control"
                    :disabled="true"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="btn-group" role="group">
            <button
              v-if="showSalvarButton"
              @click="handleClick('salvar')"
              class="button mt-2"
              :disabled="camposAtivos"
            >
              Cadastrar
            </button>
            <button
              v-if="showGerarCupomButton"
              @click="handleClick('gerarCupom')"
              class="button mt-2"
              :disabled="camposAtivos"
            >
              Gerar Cupom
            </button>
            <button
              v-if="showCancelarReservaButton"
              @click="handleClick('cancelarReserva')"
              id="btnCancelarReserva"
              class="button mt-2"
              type="button"
            >
              Cancelar Reserva
            </button>
            <button
              v-if="showExcluirButton"
              @click="handleClick('excluir')"
              id="btnExcluir"
              class="button mt-2"
              type="button"
              :disabled="camposAtivos"
            >
              Excluir Reserva
            </button>
            <button
              v-if="showModalServicos"
              @click="handleClick('servicos')"
              id="btnServicos"
              class="button mt-2"
              type="button"
            >
              Serviços
            </button>
            <button
              v-if="showModalResumo"
              @click="handleClick('resumo')"
              id="btnCancelar"
              class="button mt-2"
              type="button"
            >
              Resumo
            </button>
            <button
              v-if="showCancelarButton"
              @click="handleClick('cancelar')"
              id="btnCancelar"
              class="button mt-2"
              type="button"
            >
              Sair
            </button>
          </div>
        </form>
      </div>
      <div class="listReservas">
        <table class="table">
          <thead>
            <th scope="col">ID</th>
            <th scope="col">Id User</th>
            <th scope="col">Dt Reserva</th>
            <th scope="col">CheckIn</th>
            <th scope="col">CheckOut</th>
            <th scope="col">Qt Hospedes</th>
            <th scope="col">Vlr Total</th>
            <th scope="col">Status</th>
          </thead>
          <tbody>
            <tr scope="row" v-for="item in items" :key="item.idReservas">
              <td>{{ item.idReservas }}</td>
              <td>{{ item.usuario_idUsuario }}</td>
              <td>{{ item.dataReserva }}</td>
              <td>{{ item.dataEntradaReserva }}</td>
              <td>{{ item.dataSaidaReserva }}</td>
              <td>{{ item.qtdHospedesReserva }}</td>
              <td>{{ item.valorTotalDesconto }}</td>
              <td>{{ item.statusReserva }}</td>
              <div class="handleItem w-30 border px-3">
                <button
                  @click="handleItem('editar', item.idReservas)"
                  id="btnEditar"
                  class="button me-3"
                  type="button"
                  title="Edita a reserva"
                >
                  Editar
                </button>
                <button
                  @click="handleItem('excluir', item.idReservas)"
                  id="btnEditar"
                  class="button"
                  type="button"
                  title="Exclui a reserva"
                >
                  Excluir
                </button>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// a ordem dos imports faz diferença
// artigo https://stackoverflow.com/questions/27064176/typeerror-modal-is-not-a-function-with-bootstrap-modal

// jquery primeiro, pois modal do bootstrap depende disso...
var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

// bootstrap
//import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap/dist/js/bootstrap.js";
//const bootstrap = require("bootstrap");

import axios from "axios";
import { Reservas } from "@/../adm/src/types/reservas/Reservas.js";
import ModalServicos2 from "@/../adm/src/components/reserva/ModalServicos2";
import ModalResumo2 from "@/../adm/src/components/reserva/ModalResumo2";
import * as mainFunc from "@/../adm/src/types/reservas/MainFunctions.js";

// testar currency via import VueCurrencyInput from 'vue-currency-input';
// site https://vue-currency-input-v1.netlify.app/guide/#installation
// import { currencyFormat } from "@/../src/components/reserva/FormReserva.vue";
// import ModalResumo from "./ModalResumo";

import { mapState } from "vuex";

// tabs
// import TabViewReserva from "@/../adm/src/components/reserva/TabViewServicos.vue";
// import TabViewServicos from "@/../adm/src/components/reserva/TabViewServicos.vue";
// import TabViewResumo from "@/../adm/src/components/reserva/TabViewServicos.vue";

export default {
  name: "ReservasView.view",
  components: {
    // components....
    ModalServicos2,
    ModalResumo2,
    // TabViewReserva,
    // TabViewServicos,
    // TabViewResumo
  },
  data() {
    // data
    return {
      message: "TabTest",
      tab: null,
      // msg1: "msg1",
      // msg2: "msg2",
      inputValue: "Teste",
      msgAlerta: "Mensagens do sistema",
      flagSalvarOk: true, // flag para controle de inclusão e alteração registros
      idReservas: "",
      msgModalServicos2: "",
      arrayServicosReserva: [],
      arrayServicosBD: [],
      arrayServicosAux: [],
      msgModalResumo: "",
      idReservasModalResumo: "",
      itemReservaModalResumo: "",
      dataReserva: new Date().toISOString().substring(0, 10),
      dataEntradaReserva: new Date().toISOString().substring(0, 10),
      dataSaidaReserva: new Date().toISOString().substring(0, 10),
      valorReserva: "",
      qtdHospedesReserva: 1,
      idUsuario: "",
      nomeUsuario: "",
      idAcomodacao: "",
      acomodacaoTipo: "",
      acomodacaoVlrDiaria: 0,
      acomodacaoQtMaxPessoas: 0,
      qtDiarias: 0,
      statusReserva: "Registrada",
      dataCancelamento: new Date().toISOString().substring(0, 10),
      motivoCancelamento: "",
      cupom: "",
      taxaDescontoCupom: 10,
      valorTotalDesconto: 0,
      valorTotalServicos: 0,
      item: [],
      items: [],
      itemServico: [],
      idServico: "",
      nomeServico: "",
      itemUsuario: [],
      itemAcomodacao: [],
      itemArrayReservas: 0,
      itemArrayEdit: false,
      camposAtivos: false,
      botaoModalServicos: false,
      campoAtivoIdUsuario: false,
      showSalvarButton: true,
      showCancelarReservaButton: false,
      showExcluirButton: false,
      showCancelarButton: false,
      showModalServicos: false,
      showModalResumo: false,
      showGerarCupomButton: false,
    };
  },

  created() {
    //
    this.getReservas();
    console.log("Created:", this.itens);
  },

  beforeMount() {
    this.checkLogin();
    console.log(this.checkLogin());
  },
  setup() {
    // setup...
  },

  methods: {
    // abreTab() {
    //   var tab = new bootstrap.Tab(document.querySelector("#nav-tabs"), {
    //     keyboard: false,
    //   });
    //   return tab;
    // },

    checkLogin() {
      if (localStorage.getItem("loginStatus")) {
        if (localStorage.getItem("loginStatus") == "admin") return true;
        else if (localStorage.getItem("loginStatus") == "cliente")
          this.$router.push("/");
        return true;
      } else {
        this.$router.push("/");
        return false;
      }
    },

    changeUserId() {
      // mudou o id do usuario, dispara api para checar validade...
      this.validaUsuariosById(this.idUsuario);
    },

    // localiza servico pelo id, para verificação na tela...
    // async getServicosById(idServico) {
    //   console.log("idServico = ", idServico);
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:5000/servico/${idServico}`
    //     );
    //     this.itemServico = response.data;
    //     this.idServico = response.data.idServicos;
    //     this.nomeServico = response.data.nomeServico;
    //     this.nomeUsuario = response.data.nomeServico;
    //     //console.log("getServicosById", this.itemServico);
    //     return response;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    changeAcomodacaoId() {
      // mudou o id do usuario, dispara api para checar validade...
      this.validaAcomodacaoById(this.idAcomodacao);

      let idOK = true;
      console.log(
        "Acomodacao",
        this.acomodacaoTipo,
        this.acomodacaoVlrDiaria,
        this.acomodacaoQtMaxPessoas
      );
      return idOK;
    },

    // verificar usuario pelo id
    async validaUsuariosById(idUsuario) {
      try {
        const response = await axios.get(
          `http://localhost:5000/usuario/${idUsuario}`
        );
        this.itemUsuario = response.data;
        if (idUsuario === response.data.idUsuario) {
          this.nomeUsuario = response.data.nomeUsuario;
        } else {
          this.nomeUsuario = "Usuario inválido - Verificar!!";
        }
        //console.log("getServicosById", this.itemServico);
        return response;
      } catch (err) {
        console.log(err);
      }
    },

    // verificar acomodação  pelo id
    async validaAcomodacaoById(idAcomodacao) {
      try {
        const response = await axios.get(
          `http://localhost:5000/acomodacao/${idAcomodacao}`
        );
        this.itemAcomodacao = response.data;
        if (idAcomodacao === response.data.idAcomodacao) {
          this.acomodacaoTipo = response.data.tipoAcomodacao;
          this.acomodacaoVlrDiaria = response.data.valorAcomodacao;
          this.acomodacaoQtMaxPessoas = response.data.qtMaxPessoas;
          console.log("Dados acomoadação...",idAcomodacao,this.acomodacaoTipo,this.acomodacaoQtMaxPessoas)
        } else {
          this.acomodacaoTipo = "Acomodação inválida - Verificar!!";
          this.acomodacaoVlrDiaria = 0;
          this.acomodacaoQtMaxPessoas = 0;
        }
        //console.log("getServicosById", this.itemServico);
        return response;
      } catch (err) {
        console.log(err);
      }
    },

    // Lista todas as reservas
    async getReservas() {
      try {
        const response = await axios.get("http://localhost:5000/reserva");
        this.items = response.data;
        // console.log("getReservas - atualizando itens da lista", this.items);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    // localiza servico pelo id
    async getReservasById(idReservas) {
      console.log("idReservas = ", idReservas);
      try {
        const response = await axios.get(
          `http://localhost:5000/reserva/${idReservas}`
        );
        this.item = response.data;
        this.idReservas = this.item.idReservas;
        this.dataReserva = new Date(this.item.dataReserva)
          .toISOString()
          .substring(0, 10);
        this.dataEntradaReserva = new Date(this.item.dataEntradaReserva)
          .toISOString()
          .substring(0, 10);
        this.dataSaidaReserva = new Date(this.item.dataSaidaReserva)
          .toISOString()
          .substring(0, 10);
        this.qtdHospedesReserva = this.item.qtdHospedesReserva;
        this.valorReserva = this.item.valorReserva;
        this.valorTotalServicos = this.item.valorTotalServicos;
        this.valorTotalDesconto = this.item.valorTotalDesconto;
        this.qtDiarias = this.item.qtDiarias;
        this.cupom = this.item.cupom;
        this.taxaDescontoCupom = this.item.taxaDescontoCupom;
        this.idUsuario = this.item.usuario_idUsuario;
        this.nomeUsuario = this.item.nomeUsuario;
        this.idAcomodacao = this.item.acomodacoes_idAcomodacao;
        this.acomodacaoTipo = this.item.nomeAcomodacao;
        this.acomodacaoVlrDiaria = this.item.valorAcomodacao;
        this.statusReserva = this.item.statusReserva;
        this.dataCancelamento = new Date(this.item.dataCancelamento)
          .toISOString()
          .substring(0, 10);
        this.motivoCancelamento = this.item.motivoCancelamento;
        if (
          this.statusReserva === "Cancelada" ||
          this.statusReserva === "Encerrada" ||
          this.statusReserva === "Excluída"
        ) {
          this.camposAtivos = true;
          this.botaoModalServicos = true;
          alert(
            "O status desta reserva não permite mais edição ou exclusão! Para reativar a reserva entre em contato com o gerente do Hotel"
          );
        } else {
          this.camposAtivos = false;
          this.botaoModalServicos = false;
        }
        console.log(
          "this.acomodacaoTipo",
          this.statusReserva,
          this.acomodacaoTipo,
          this.acomodacaoVlrDiaria
        );
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    getServicosByReservaId(idReservas) {
      return axios.get(`http://localhost:5000/servicoReserva/${idReservas}`);
    },

    handleClick(action) {
      if (action == "salvar") {
        // this.msg1 = "Cliquei handleClick salvar...";
        // this.msg2 = `Status itemArrayEdit=${this.itemArrayEdit}`;

        // executa validação dos campos...
        let validadorDados,dadosOk,msgRetorno;
        validadorDados = checkInfo(this.idUsuario,this.idAcomodacao,this.dataReserva,this.dataEntradaReserva,this.dataSaidaReserva,this.qtdHospedesReserva,this.acomodacaoQtMaxPessoas);
        dadosOk = validadorDados[0];
        msgRetorno = validadorDados[1];

        // exibe mensagem de erro se necessário, aborta persistência...
        if (dadosOk == false) {
          this.msgAlerta = `${msgRetorno}`;
          return false;
        }

        // atualiza dados do array antes de salvar...

        // lista usuario por id - colocar em methods....
        // async getAcomodacaoById() {
        //     try {
        //         const response = await axios.get(
        //             `http://localhost:5000/acomodacao/${this.$route.params.id}`
        //         );
        //         this.nomeAcomod = response.data.nomeAcomodacao;
        //         this.descAcomod = response.data.descricaoAcomodacao;
        //         this.valorAcomod = response.data.valorAcomodacao;
        //         this.tipoAcomod = response.data.tipoAcomodacao;
        //     } catch (err) {
        //         console.log(err);
        //     }
        // },

        this.getServicosByReservaId(this.idReservas)
          .then(response => {
              console.log("teste",response.data[0]);
              this.arrayServicosBD = response.data
          })
          .catch(error => {
              console.log(error);
              // Handle error here
          });

        console.log("Chamei a nova função...retorno ...:",this.arrayServicosBD);
        let reserva = new Reservas();

        reserva.salvar(
          this.idReservas,
          this.dataReserva,
          this.dataEntradaReserva,
          this.dataSaidaReserva,
          this.valorReserva,
          this.qtdHospedesReserva,
          this.idUsuario,
          this.idAcomodacao,
          this.acomodacaoTipo,
          this.acomodacaoVlrDiaria,
          this.qtDiarias,
          this.statusReserva,
          this.dataCancelamento,
          this.motivoCancelamento,
          this.cupom,
          this.taxaDescontoCupom,
          this.valorTotalDesconto,
          this.valorTotalServicos,
          this.itemArrayReservas,
          this.itemArrayEdit,
          this.arrayServicosBD
        );

        // recarrega lista de serviços
        this.getReservas();
        // força atualização pela segunda vez, no caso de edição não está atualizando com um unica chamada, checar...
        this.getReservas();

      }

      if (action == "cancelar") {
        this.camposAtivos = false;
        this.campoAtivoIdUsuario = false;
      }

      if (action == "cancelarReserva") {
        // chama rotina de exclusão, desabilita o botão e limpa os campos na rotina que já está abaixo...
        console.log("Entrei no handleClick - cancelarReserva");
        this.getReservas();
      }

      if (action == "excluir") {
        // chama rotina de exclusão, desabilita o botão e limpa os campos na rotina que já está abaixo...
        // this.msg1 = "Cliquei handleClick excluir...";
        // this.msg2 = `this.idReservas=${this.idReservas}`;
        let conf = confirm(
          "Confirma exclusão da reserva? Esta operação não poderá ser desfeita!"
        );
        if (conf) {
          let reserva = new Reservas();
          reserva.excluir(this.idReservas);
          // recarrega lista de serviços
          this.getReservas();
        }
      }

      if (action == "servicos") {
        // console.log("vou mostrar modal de servicos2", this.idReservas);
        this.arrayServicosBD = this.ServicosReserva;
        window.$("#modalServicos2").modal("show");
        this.msgModalServicos2 =
          "Baixa utilizaçao serviço 5G - ofereça desconto na reserva";
        // this.idReservasModalServicos2 = this.idReservas.toString();
        // this.qtDiariasModalServicos2 = this.qtDiarias;
        // this.valorServicosModalServicos2 = this.valorTotalServicos;

        // console.log("vou recarregar servicos na modal2", this.idReservas);
        this.$store.dispatch("ServicosReserva/getData", { idReserva: `${this.idReservas}` });
        return true;
      }

      if (action == "resumo") {
        console.log("vou mostrar modal de resumo2", this.idReservas);
        this.idReservasModalResumo = this.idReservas;
        this.itemReservaModalResumo = this.item;
        this.msgModalResumo = "Área de mensagens...ModalResumo2";
        window.$("#modalResumo2").modal("show");
        // window.$().ready(function () {
        //   window.$("#btnServicos").click(function () {
        //     window.$("#modalServicos2").modal("show");
        //   });
        //});
        return true;
      }

      if (action == "gerarCupom") {
        if (this.cupom === "" || this.cupom == "Sem desconto") {
          let conf = confirm("Confirma geração de cupom?");
          console.log("Conf...:", conf);
          if (conf === true) {
            this.cupom = mainFunc.geraCupomDesconto();
            this.taxaDescontoCupom = 10;
            console.log("Vou gerar cupom", this.cupom);
            let conf = confirm(
              `Cupom gerado e autorizado - ${this.cupom} - deseja aplicar o mesmo na reserva?\nApós o desconto alterações nos dados da reserva requerem atenção!`
            );
            if (conf === true) {
              // força calculo antes de salvar...
              this.arrayServicosBD = this.ServicosReserva;
              // this.calculaReserva();
              this.handleClick("salvar");
            }
          }
        } else {
          alert("Um cupom de desconto já foi aplicado nesta reserva!");
          this.cupom === ""
            ? (this.showGerarCupomButton = true)
            : (this.showGerarCupomButton = false);
        }
        return true;
      }

      // após inclusão, limpa campos do form...
      this.dataReserva = new Date().toISOString().substring(0, 10);
      this.dataEntradaReserva = new Date().toISOString().substring(0, 10);
      this.dataSaidaReserva = new Date().toISOString().substring(0, 10);
      this.valorReserva = "";
      this.qtdHospedesReserva = "";
      this.idUsuario = "";
      this.nomeUsuario = "";
      this.idAcomodacao = "";
      this.acomodacaoTipo = "";
      this.acomodacaoVlrDiaria = 0;
      this.qtDiarias = 0;
      this.statusReserva = "Registrada"; // status inicial da Reserva
      this.dataCancelamento = new Date().toISOString().substring(0, 10);
      (this.motivoCancelamento = ""),
        (this.cupom = ""),
        (this.taxaDescontoCupom = 0),
        (this.valorTotalDesconto = 0),
        (this.valorTotalServicos = 0),
        // retorna status dos botões...
        (this.showSalvarButton = true);
      this.showCancelarButton = false;
      this.showCancelarReservaButton = false;
      this.showExcluirButton = false;
      this.showModalServicos = false;
      this.showModalResumo = false;
      this.showGerarCupomButton = false;
      this.itemArrayEdit = false;

      this.getReservas();
      return true;
    },

    handleItem(action, idReservas) {
      // console.log("Entrei no handleItem");
      // let storageServico = new StorageServico(document.querySelector("form"));
      if (action == "editar") {
        // this.msg1 = "Cliquei HandleItem edit";
        this.campoAtivoIdUsuario = false;
        this.getReservasById(idReservas);
        this.itemArrayEdit = true;
        // contorle de edição do user
        this.showSalvarButton = true;
        this.showCancelarButton = true;
        this.showCancelarReservaButton = false;
        this.showExcluirButton = false;
        this.showModalServicos = true;
        this.showModalResumo = true;
        this.msg2 = `Status itemArrayEdit=${this.itemArrayEdit}`;

        this.arrayServicosBD = this.ServicosReserva;

        // this.cupom === "" ? (this.showGerarCupomButton = true) : (this.showGerarCupomButton = false);
       this.showGerarCupomButton = true;
      }
      if (action == "excluir") {
        // this.msg1 = "Cliquei HandleItem excluir";
        // atualiza campos do formulário
        this.getReservasById(idReservas);
        this.itemArrayEdit = false;
        this.campoAtivoIdUsuario = false;
        this.showSalvarButton = false;
        this.showCancelarButton = true;
        this.showCancelarReservaButton = false;
        this.showExcluirButton = true;
        this.showModalServicos = true;
        this.showModalResumo = true;
      }
      if (action == "cancelar") {
        // this.msg1 = "Cliquei HandleItem cancelar reserva";
        // atualiza campos do formulário
        this.getReservasById(idReservas);
        this.itemArrayEdit = false;
        this.campoAtivoIdUsuario = false;
        this.showSalvarButton = false;
        this.showCancelarButton = true;
        this.showCancelarReservaButton = true;
        this.showExcluirButton = false;
        this.showModalServicos = false;
        this.showModalResumo = false;
        this.showModalServicos = false;
      }
      this.msg2 = `idReservas ${idReservas}`;
      this.campoAtivoIdUsuario = true;
    },
  },
  watch: {
    // isso funciona, mas executa a cada novo caracter, e não somente depois de um tab ou enter...
    // idUsuario: function (val) {
    //   console.log("Mudou valor id usuario. ID: ", val);
    // },
  },
  computed: {
    // incluir funções...
    ...mapState(["Servicos2"]),
    ...mapState(["ServicosReserva"]),

  },
  mounted() {
    // funções mounted...
    console.log("Passando pelo mounted...");
    this.$store.dispatch("Servicos2/getData");
    // não executar update de ServicosReserva pois ainda não existe uma reserva selecionada...
    // this.$store.dispatch("ServicosReserva/getData", { idReserva: `${this.idReservas}` } );
  },
};

export function checkInfo(idUsuario,idAcomodacao,dataReserva,dtEntrada, dtSaida, qtdHospedesReserva,acomodacaoQtMaxPessoas) {

  let msgReturn;
  msgReturn = [true, "Dados OK!"];
  console.log(idUsuario,idAcomodacao,dataReserva,dtEntrada, dtSaida, qtdHospedesReserva,acomodacaoQtMaxPessoas);

  if (idUsuario === "" ) {
    msgReturn = [false, "Usuario inválido"];
    return msgReturn;
  }

  if (idAcomodacao === "" ) {
    msgReturn = [false, "Acomodação inválida"];
    return msgReturn;
  }

  if ( dtEntrada < dataReserva || dtEntrada == "" || dtSaida == "" || dtSaida <= dtEntrada) {
     msgReturn = [false, "Datas de entrada e/ou saída inválidas"];
     return msgReturn;
  }

  // if (qtdHospedesReserva == 0 || qtdHospedesReserva > acomodacaoQtMaxPessoas) {
  //   msgReturn = [false, "Quantidade de pessoas inválido"];
  //   return msgReturn;
  // }

  console.log("msgReturn...",msgReturn)

  return msgReturn;
}

</script>

<style scoped>
@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.column {
  float: left;
  width: 50%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

.sec {
  position: relative;
  padding: 2vw;
  transition: all 0.3s ease;
  color: black;
}

.sec > div {
  max-width: 90%;
  margin: 2% 5%;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 5%;
}

.flex > div {
  flex: 1 1 420px;
  margin: 10px;
}
.button {
  background: transparent;
  color: black;
  padding: 5px;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
}

.button:hover {
  background: black;
  color: #fff;
  border-radius: 50px;
  padding: 5px;
}
</style>

<!-- verificar se é possível simplificar o formulário usando o conceito abaixo, o form atual tem muitos campos 
e fica complicado de tratar entre as funções -->

<!-- <template>
    <form>
        <input v-model="form.first_name"/>
        <input v-model="form.last_name"/>
        <input v-model="form.email"/>
    </form> 
</template>

<script>
    const defaultForm = {
        first_name: '',
        last_name: '',
        email: '',
    }  
    export default {
      data () {
        return {
            form: defaultForm
        }
      },
      computed: {
        hasChanged () {
          return Object.keys(this.form).some(field => this.form[field] !== defaultForm[field])
        }
      }
    }
</script> -->
