<template>
  <div class="sec">
    <h4>ReservasView.vue - quando ok ocultar esta área!!!</h4>
    <hr />
    <p>Teste msg1: {{ msg1 }}</p>
    <span>Teste msg2: {{ msg2 }}</span>
    <p></p>
    <button @click="changeName('Alterei msg1!')">Teste msg1</button>
    <button @click="changeAge('Alterei msg2!')">Teste msg2</button>
    <input v-model="inputValue" />
    <hr />
    <div class="container border p-4 my-5 w-100">
      <p id="msgAlerta">{{ msgAlerta }}</p>
      <hr />
      <form class="formReservas" action="" @submit.prevent>
        <div class="row">
          <div class="column">
            <div class="my-2">
              <label for="dataReserva" class="d-block fw-bold mb-2"
                >Data da reserva</label
              >
              <input
                type="date"
                id="dataReserva"
                v-model="dataReserva"
                placeholder="Data da reserva"
                class="form-control"
                :disabled="camposAtivos"
              />
            </div>
            <div class="my-2">
              <label for="dataEntradaReserva" class="d-block fw-bold mb-2"
                >Data de Checkin</label
              >
              <input
                type="date"
                id="descricao"
                v-model="dataEntradaReserva"
                placeholder="Data Checkin Reserva"
                class="form-control"
                :disabled="camposAtivos"
              />
            </div>
            <div class="my-2">
              <label for="dataSaidaReserva" class="d-block fw-bold mb-2"
                >Data de Checkout</label
              >
              <input
                type="date"
                id="label"
                v-model="dataSaidaReserva"
                placeholder="Data Checkout Reserva"
                class="form-control"
                :disabled="camposAtivos"
              />
            </div>
            <div>
              <label for="qtdHospedesReserva" class="d-block fw-bold mb-2"
                >Qtd Hospedes</label
              >
              <input
                type="number"
                id="qtdHospedesReserva"
                v-model.number="qtdHospedesReserva"
                placeholder="Qtd Hospedes"
                class="form-control"
                :disabled="camposAtivos"
              />
            </div>
            <div>
              <label
                for="statusReserva"
                class="d-block fw-bold mb-2"
                v-if="itemArrayEdit"
                >Status Reserva</label
              >
              <input
                type="text"
                id="statusReserva"
                v-model="statusReserva"
                placeholder="Status da Reserva"
                class="form-control"
                v-if="itemArrayEdit"
                :disabled="camposAtivos"
              />
            </div>
            <div>
              <label
                for="dataCancelamento"
                class="d-block fw-bold mb-2"
                v-if="itemArrayEdit"
                >Data cancelamento reserva</label
              >
              <input
                type="date"
                id="dataCancelamento"
                v-model="dataCancelamento"
                placeholder="Data cancelamento reserva"
                class="form-control"
                v-if="itemArrayEdit"
                :disabled="true"
              />
            </div>
            <div>
              <label
                for="motivoCancelamento"
                class="d-block fw-bold mb-2"
                v-if="itemArrayEdit"
                >Motivo cancelamento reserva</label
              >
              <input
                type="text"
                id="motivoCancelamento"
                v-model="motivoCancelamento"
                placeholder="Motivo cancelamento reserva"
                class="form-control"
                v-if="itemArrayEdit"
                :disabled="camposAtivos"
              />
            </div>
          </div>
          <div class="column">
            <div class="my-2">
              <div>
                <label for="idUsuario" class="d-block fw-bold mb-2"
                  >ID Usuario</label
                >
                <input
                  type="number"
                  id="idUsuario"
                  v-model.number="idUsuario"
                  placeholder="id do Usuario"
                  class="form-control"
                  @change="changeUserId"
                  :disabled="camposAtivos"
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
              <div>
                <label for="idAcomodacao" class="d-block fw-bold mb-2"
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
              </div>
              <div>
                <label for="valorReserva" class="d-block fw-bold mb-2"
                  >Valor Total Reserva</label
                >
                <input
                  type="number"
                  id="valorReserva"
                  v-model.number="valorReserva"
                  placeholder="Valor da Reserva"
                  class="form-control"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="formServicosButtons">
          <button
            v-if="showSalvarButton"
            @click="handleClick('salvar')"
            class="btn btn-info my-3 fw-bold text-uppercase text-white"
            :disabled="camposAtivos"
          >
            Salvar
          </button>
          <button
            v-if="showCancelarReservaButton"
            @click="handleClick('cancelarReserva')"
            id="btnCancelarReserva"
            class="btn btn-warning my-3 fw-bold text-uppercase text-red"
            type="button"
          >
            Cancelar Reserva
          </button>
          <button
            v-if="showExcluirButton"
            @click="handleClick('excluir')"
            id="btnExcluir"
            class="btn btn-warning my-3 fw-bold text-uppercase text-red"
            type="button"
            :disabled="camposAtivos"
          >
            Excluir Reserva
          </button>
          <button
            v-if="showCancelarButton"
            @click="handleClick('cancelar')"
            id="btnCancelar"
            class="btn btn-warning my-3 fw-bold text-uppercase text-white"
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
            <td>{{ item.valorReserva }}</td>
            <td>{{ item.statusReserva }}</td>
            <div class="handleItem w-30 border px-3">
              <button
                @click="handleItem('editar', item.idReservas)"
                id="btnEditar"
                class="btn btn-warning my-3 fw-bold text-uppercase text-white"
                type="button"
                title="Edita a reserva"
              >
                Editar
              </button>
              <!-- <button
                @click="handleItem('cancelar', item.idReservas)"
                id="btnEditar"
                class="btn btn-warning my-3 fw-bold text-uppercase text-red"
                type="button"
                title="Cancela a reserva"
              >
                Cancelar
              </button> -->
              <button
                @click="handleItem('excluir', item.idReservas)"
                id="btnEditar"
                class="btn btn-warning my-3 fw-bold text-uppercase text-green"
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
</template>

<script>
import axios from "axios";
import { Reservas } from "@/../adm/src/types/reservas/Reservas.js";
//import { Servicos } from "@/../adm/src/types/reservas/Servicos.js";

var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

export default {
  name: "ReservasView.view",
  data() {
    // data
    return {
      msg1: "msg1",
      msg2: "msg2",
      inputValue: "Teste",
      msgAlerta: "Mensagens do sistema",
      idReservas: "",
      dataReserva: new Date().toISOString().substring(0, 10),
      dataEntradaReserva: new Date().toISOString().substring(0, 10),
      dataSaidaReserva: new Date().toISOString().substring(0, 10),
      valorReserva: "",
      qtdHospedesReserva: "",
      idUsuario: "",
      nomeUsuario: "",
      idAcomodacao: "",
      acomodacaoTipo: "",
      acomodacaoVlrDiaria: 0,
      vlrDiariaAcomodacao: "",
      qtDiarias: 0,
      statusReserva: "Criada",
      dataCancelamento: new Date().toISOString().substring(0, 10),
      motivoCancelamento: "",
      cupom: "",
      taxaDescontoCupom: 0,
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
      showSalvarButton: true,
      showCancelarReservaButton: false,
      showExcluirButton: false,
      showCancelarButton: false,
    };
  },

  created() {
    //
    // emit e props, avaliar !!!!!
    //
    // ajuste para usar objeto Reservas...
    // let reserva = new Reservas();
    // this.itens = reserva.getReservas();
    // console.log("Created:", this.itens);
    //
    // fica assim na console...
    // [[Prototype]] : Promise
    // [[PromiseState]] : "fulfilled"
    // [[PromiseResult]] : Array(4)
    // ou

    this.getReservas();
    console.log("Created:", this.itens);
  },

  setup() {
    // setup...
  },

  components: {
    // components....
  },

  methods: {
    // campos do cabecalho, apoio para desenvolvimento...
    changeName(msg1) {
      this.msg1 = msg1;
      this.inputValue = "Teste Alterado";
    },
    changeAge(msg2) {
      this.msg2 = msg2;
    },

    changeUserId() {
      // mudou o id do usuario, dispara api para checar validade...
      this.validaUsuariosById(this.idUsuario);
    },

    // localiza servico pelo id
    async getServicosById(idServico) {
      // console.log("idServico = ", idServico);
      //let id = document.getElementById("idUsuario").value;
      //console.log("Mudou id Usuario", id);
      //console.log(this.itemUsuario);

      // somente para testes...incluir no local correto para checar id de servicos
      //let serv = new Servicos();
      //this.itemServico = serv.getServicosById(18);
      // this.getServicosById(18);
      // console.log(this.itemServico);
      // console.log(this.idServico);
      // console.log(this.nomeServico);
      // this.nomeUsuario
      // validaUsuario(id);
      try {
        const response = await axios.get(
          `http://localhost:5000/servico/${idServico}`
        );
        this.itemServico = response.data;
        this.idServico = response.data.idServicos;
        this.nomeServico = response.data.nomeServico;
        this.nomeUsuario = response.data.nomeServico;
        //console.log("getServicosById", this.itemServico);
        return response;
      } catch (err) {
        console.log(err);
      }
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

    changeAcomodacaoId() {
      let idOK = true;
      // let id = document.getElementById("idAcomodacao").value;
      // console.log("id", id);
      // console.log("mudou tipo acomodacao", this.acomodacaoTipo);
      switch (this.idAcomodacao) {
        case 1:
          this.acomodacaoTipo = "Master";
          this.acomodacaoVlrDiaria = 600;
          break;
        case 2:
          this.acomodacaoTipo = "Family";
          this.acomodacaoVlrDiaria = 400;
          break;
        case 3:
          this.acomodacaoTipo = "Comfort";
          this.acomodacaoVlrDiaria = 250;
          break;
        default:
          alert(
            "Erro: ID tipo suite inválido - verificar! ID: ",
            this.idAcomodacao
          );
          idOK = false;
      }
      console.log("Acomodacao", this.acomodacaoTipo, this.acomodacaoVlrDiaria);
      return idOK;
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
        if (this.statusReserva === "Cancelada") {
          this.camposAtivos = true;
          alert(
            "Esta reserva foi cancelada! Edição e exclusão não permitidos!"
          );
        } else {
          this.camposAtivos = false;
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

    handleClick(action) {
      if (action == "salvar") {
        this.msg1 = "Cliquei handleClick salvar...";
        this.msg2 = `Status itemArrayEdit=${this.itemArrayEdit}`;
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
          this.itemArrayEdit
        );

        // recarrega lista de serviços
        this.getReservas();
        // força atualização pela segunda vez, no caso de edição não está atualizando com um unica chamada, checar...
        this.getReservas();
      }

      if (action == "cancelar") {
        // não faz nada, a rotina de edição está no "servico.salvar" só desabilita o botão e limpa os campos na rotina que já está abaixo...
        // this.showSalvarButton = true;
        // this.showCancelarButton = false;
        // this.showExcluirButton = false;
        this.camposAtivos = false;
      }

      if (action == "cancelarReserva") {
        // chama rotina de exclusão, desabilita o botão e limpa os campos na rotina que já está abaixo...
        console.log("Entrei no handleClick - cancelarReserva");
        // let reserva = new Reservas();
        //reserva.excluir(this.idReservas);
        // recarrega lista de serviços
        this.getReservas();
      }

      if (action == "excluir") {
        // chama rotina de exclusão, desabilita o botão e limpa os campos na rotina que já está abaixo...
        this.msg1 = "Cliquei handleClick excluir...";
        this.msg2 = `this.idReservas=${this.idReservas}`;
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
      this.statusReserva = "Criada"; // status inicial da Reserva
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
      this.itemArrayEdit = false;
      this.getReservas();
      return true;
    },

    handleItem(action, idReservas) {
      // console.log("Entrei no handleItem");
      // let storageServico = new StorageServico(document.querySelector("form"));
      if (action == "editar") {
        this.msg1 = "Cliquei HandleItem edit";
        // atualiza campos do formulário
        this.getReservasById(idReservas);
        this.itemArrayEdit = true;
        this.showSalvarButton = true;
        this.showCancelarButton = true;
        this.showCancelarReservaButton = false;
        this.showExcluirButton = false;
        this.msg2 = `Status itemArrayEdit=${this.itemArrayEdit}`;
      }
      if (action == "excluir") {
        this.msg1 = "Cliquei HandleItem excluir";
        // atualiza campos do formulário
        this.getReservasById(idReservas);
        this.itemArrayEdit = false;
        this.showSalvarButton = false;
        this.showCancelarButton = true;
        this.showCancelarReservaButton = false;
        this.showExcluirButton = true;
      }
      if (action == "cancelar") {
        this.msg1 = "Cliquei HandleItem cancelar reserva";
        // atualiza campos do formulário
        this.getReservasById(idReservas);
        this.itemArrayEdit = false;
        this.showSalvarButton = false;
        this.showCancelarButton = true;
        this.showCancelarReservaButton = true;
        this.showExcluirButton = false;
      }
      //this.msg2 = `idReservas ${idReservas}`;
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
  },
  mounted() {
    // funções mounted...
  },
};

export function formataData(dataUTC) {
  let dateAux, dateConv;
  console.log("Data no padrão UTC...", dataUTC),
    // converte UTC para YYYY-MM-DD
    (dateAux = dataUTC.split("-")),
    // (dateConv = new Date(dateAux[0], dateAux[1] - 1, dateAux[2]));
    (dateConv = new Date("2023", "02", "17")),
    console.log(
      "Data ajustada",
      dateAux,
      dateAux[0],
      dateAux[1] - 1,
      dateAux[2],
      dateConv
    );
  return dateConv;
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
