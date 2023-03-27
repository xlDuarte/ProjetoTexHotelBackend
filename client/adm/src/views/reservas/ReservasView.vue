<template>
  <div>
    <div class="modalServicos2">
      <ModalServicos2 />
    </div>
    <div class="modalResumo2">
      <ModalResumo2 :msg="msgModalResumo" :idReservas="idReservasModalResumo" :itemReservas="itemReservaModalResumo" />
    </div>
    <div class="sec">
      
     <div class="text-center">
      <h2>CADASTRO DE RESERVAS</h2>
      <p>*Campos de preenchimento obrigatório.</p>
    </div>
      
      <div class="shadow container  bg-light rounded-3 p-4 mx-auto my-5 w-50">      
          
        <p id="msgAlerta">{{ msgAlerta }}</p>
        <hr />
        <form class="formReservas" action="" @submit.prevent>
           <div class="container">
          <div class="row my-2">
            
            <div class="col col-5 w-25">
                <label for="dataReserva" class=" d-block fw-bold ">*Data da reserva</label>
                <input type="date" id="dataReserva" v-model="dataReserva" placeholder="Data da reserva"
                  class="form-control w-75 ms-1" :disabled="camposAtivos" />
            </div>
              <div class="col col-5 w-25">
                <label for="dataEntradaReserva" class=" d-block fw-bold">*Data de Checkin</label>
                <input type="date" id="descricao" v-model="dataEntradaReserva" placeholder="Data Checkin Reserva"
                  class="form-control w-75 ms-1" :disabled="camposAtivos" />
              </div>
              <div class="col col-5 w-25">
                <label for="dataSaidaReserva" class=" d-block fw-bold">*Data de Checkout</label>
                <input type="date" id="label" v-model="dataSaidaReserva" placeholder="Data Checkout Reserva"
                  class="form-control w-75 ms-1" :disabled="camposAtivos" />
              </div>
              <div class="col col-5 w-25">
                <label for="qtdHospedesReserva" class=" d-block fw-bold">*Qtd Hospedes</label>
                <input type="number" id="qtdHospedesReserva" v-model.number="qtdHospedesReserva"
                  placeholder="Qtd Hospedes" class="form-control w-75 ms-1" min="0" :disabled="camposAtivos" />
              
              </div>

              <div class="col col-3">  
                <label for="statusReserva" class="mt-3 d-block fw-bold" v-if="itemArrayEdit">*Status Reserva</label>
                <!-- <input
                  type="text"
                  id="statusReserva"
                  v-model="statusReserva"
                  placeholder="Status da Reserva"
                  class="form-control"
                  v-if="itemArrayEdit"
                  :disabled="camposAtivos"
                /> -->

                <select id="statusReserva" v-model="statusReserva" placeholder="Status da Reserva" class="form-control ms-1 w-75 "
                  v-if="itemArrayEdit" :disabled="camposAtivos">
                  <option value="Registrada">Registrada</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="Encerrada">Encerrada</option>
                  <option value="Cancelada">Cancelada</option>
                  <option value="Excluida">Excluída</option>
                </select>
              </div>
              <div class="mt-3 col col-4">
                <label for="dataCancelamento" class="d-block fw-bold " v-if="itemArrayEdit"><small>Data cancelamento</small></label>
                <input type="date" id="dataCancelamento" v-model="dataCancelamento"
                  placeholder="Data cancelamento reserva" class="form-control w-50" v-if="itemArrayEdit" :disabled="true" />
              </div>

              <div class="mt-3 col col-5 ">
                <label for="motivoCancelamento" class="d-block fw-bold " v-if="itemArrayEdit"><small>Motivo cancelamento</small></label>
                <input type="text" id="motivoCancelamento" v-model="motivoCancelamento"
                  placeholder="Motivo cancelamento" class="form-control me-auto w-75" v-if="itemArrayEdit"
                  :disabled="camposAtivos" />
              </div>

            </div>
           
            <div class="container">
          <div class="row my-2 mt-3">
            
            <div class="col col-5 me-5">
                  <label for="idUsuario" class="d-block fw-bold ">ID Usuario</label>
                  <input type="number" id="idUsuario" v-model.number="idUsuario" placeholder="id do Usuario"
                    class="form-control" @change="changeUserId" :disabled="camposAtivos" />
                  <input type="text" id="nomeUsuario" v-model="nomeUsuario" placeholder="Nome Usuario"
                    class="form-control" :disabled="true" />
                </div>
                <div class="col col-5 mx-auto">
                  <label for="idAcomodacao" class="d-block fw-bold">ID Acomodacao</label>
                  <input type="number" id="idAcomodacao" v-model.number="idAcomodacao" placeholder="id da Acomodacao"
                    class="form-control" @change="changeAcomodacaoId" :disabled="camposAtivos" />
                  <input type="text" id="acomodacaoTipo" v-model="acomodacaoTipo" placeholder="Tipo Acomodação"
                    class="form-control" :disabled="true" />
                  <input type="text" id="acomodacaoVlrDiaria" v-model="acomodacaoVlrDiaria"
                    placeholder="Vlr Diaria Acomodação" class="form-control" :disabled="true" />
                </div>
                <div class="col col-5 me-5">
                  <label for="valorReserva" class="d-block fw-bold ">Valor Total Reserva</label>
                  <input type="number" id="valorReserva" v-model.number="valorReserva" placeholder="Valor da Reserva"
                    class="form-control" :disabled="true" />
                </div>
              </div>
            </div>
          </div>

          <div class="btn-group" role="group">
            <button v-if="showSalvarButton" @click="handleClick('salvar')"
              class="button mt-2" :disabled="camposAtivos">
              Cadastrar
            </button>
            <button v-if="showCancelarReservaButton" @click="handleClick('cancelarReserva')" id="btnCancelarReserva"
              class="button mt-2" type="button">
              Cancelar Reserva
            </button>
            <button v-if="showExcluirButton" @click="handleClick('excluir')" id="btnExcluir"
              class="button mt-2" type="button" :disabled="camposAtivos">
              Excluir Reserva
            </button>
            <button v-if="showModalServicos" @click="handleClick('servicos')" id="btnServicos"
              class="button mt-2" type="button">
              Serviços
            </button>
            <button v-if="showModalResumo" @click="handleClick('resumo')" id="btnCancelar"
              class="button mt-2" type="button">
              Resumo
            </button>
            <button v-if="showCancelarButton" @click="handleClick('cancelar')" id="btnCancelar"
              class="button mt-2" type="button">
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
                <button @click="handleItem('editar', item.idReservas)" id="btnEditar"
                  class="button me-3" type="button" title="Edita a reserva">
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
                <button @click="handleItem('excluir', item.idReservas)" id="btnEditar"
                  class="button " type="button" title="Exclui a reserva">
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
var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

//import { ref } from "vue";
import axios from "axios";
import { Reservas } from "@/../adm/src/types/reservas/Reservas.js";
//import { Servicos } from "@/../adm/src/types/reservas/Servicos.js";
import ModalServicos2 from "@/../adm/src/components/reserva/ModalServicos2";
import ModalResumo2 from "@/../adm/src/components/reserva/ModalResumo2";
// import ModalResumo from "./ModalResumo";

export default {
  name: "ReservasView.view",
  components: {
    // components....
    ModalServicos2,
    ModalResumo2,
  },
  data() {
    // data
    return {
      msg1: "msg1",
      msg2: "msg2",
      inputValue: "Teste",
      msgAlerta: "Mensagens do sistema",
      flagSalvarOk: true, // flag para controle de inclusão e alteração registros
      idReservas: "",
      idReservasModalResumo: "",
      msgModalResumo: "",
      itemReservaModalResumo: "",
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
      acomodacaoQtMaxPessoas: 0,
      qtDiarias: 0,
      statusReserva: "Registrada",
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
      showModalServicos: false,
      showModalResumo: false,
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
  beforeMount() {
    this.checkLogin();
    console.log(this.checkLogin())
  },
  setup() {
    // setup...
    // const modalActive = ref(true);
    // const toogleModal = () => {
    //   modalActive.value = !modalActive.value;
    // };
    // return { modalActive, toogleModal };
  },

  methods: {
    checkLogin() {
      if (localStorage.getItem("loginStatus")) {
        if (localStorage.getItem("loginStatus") == "admin")
          return true
        else if (localStorage.getItem("loginStatus") == "cliente")
          this.$router.push("/")
        return true
      } else {
        this.$router.push("/")
        return false
      }
    },
   
    changeUserId() {
      // mudou o id do usuario, dispara api para checar validade...
      this.validaUsuariosById(this.idUsuario);
    },

    // localiza servico pelo id
    async getServicosById(idServico) {
      console.log("idServico = ", idServico);
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

    changeAcomodacaoId() {
      // mudou o id do usuario, dispara api para checar validade...
      this.validaAcomodacaoById(this.idAcomodacao);

      let idOK = true;
      // // let id = document.getElementById("idAcomodacao").value;
      // // console.log("id", id);
      // // console.log("mudou tipo acomodacao", this.acomodacaoTipo);
      // switch (this.idAcomodacao) {
      //   case 1:
      //     this.acomodacaoTipo = "Master";
      //     this.acomodacaoVlrDiaria = 600;
      //     break;
      //   case 2:
      //     this.acomodacaoTipo = "Family";
      //     this.acomodacaoVlrDiaria = 400;
      //     break;
      //   case 3:
      //     this.acomodacaoTipo = "Comfort";
      //     this.acomodacaoVlrDiaria = 250;
      //     break;
      //   default:
      //     alert(
      //       "Erro: ID tipo suite inválido - verificar! ID: ",
      //       this.idAcomodacao
      //     );
      //     idOK = false;
      // }
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

    // verificar usuario pelo id
    async validaAcomodacaoById(idAcomodacao) {
      try {
        const response = await axios.get(
          `http://localhost:5000/acomodacao/${idAcomodacao}`
        );
        this.itemAcomodacao = response.data;
        if (idAcomodacao === response.data.idAcomodacao) {
          this.acomodacaoTipo = response.data.nomeAcomodacao;
          this.acomodacaoVlrDiaria = response.data.valorAcomodacao;
          this.acomodacaoQtMaxPessoas = response.data.qtMaxPessoas;
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
      if (action == "servicos") {
        console.log("vou mostrar modal de servicos2");
        window.$("#modalServicos2").modal("show");
        // window.$().ready(function () {
        //   window.$("#btnServicos").click(function () {
        //     window.$("#modalServicos2").modal("show");
        //   });
        //});
      }

      if (action == "resumo") {
        console.log("vou mostrar modal de resumo2");
        this.idReservasModalResumo = this.idReservas;
        this.itemReservaModalResumo = this.item;
        this.msgModalResumo = "Área de mensagens...";
        window.$("#modalResumo2").modal("show");
        // window.$().ready(function () {
        //   window.$("#btnServicos").click(function () {
        //     window.$("#modalServicos2").modal("show");
        //   });
        //});
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
        this.showModalServicos = true;
        this.showModalResumo = true;
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
        this.showModalServicos = true;
        this.showModalResumo = true;
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
        this.showModalServicos = false;
        this.showModalResumo = false;
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

.sec>div {
  max-width: 90%;
  margin: 2% 5%;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 5%;
}

.flex>div {
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
