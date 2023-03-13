<template>
  <div class="sec">
    <h4>ServicosView.vue - quando ok ocultar esta área!!!</h4>
    <hr />
    <p>Teste msg1: {{ msg1 }}</p>
    <span>Teste msg2: {{ msg2 }}</span>
    <p></p>
    <button @click="changeName('Alterei msg1!')">Teste msg1</button>
    <button @click="changeAge('Alterei msg2!')">Teste msg2</button>
    <hr />
    <div class="container border p-4 my-5 w-50">
      <form class="formServicos" action="" @submit.prevent>
        <div class="my-2">
          <label for="nome" class="d-block fw-bold mb-2"
            >Nome abreviado do serviço</label
          >
          <input
            type="text"
            id="nome"
            v-model="nome"
            placeholder="Abreviação do serviço"
            class="form-control"
            maxlength="45"
          />
        </div>
        <div class="my-2">
          <label for="descricao" class="d-block fw-bold mb-2"
            >Descriçao do serviço</label
          >
          <input
            type="text"
            id="descricao"
            v-model="descricao"
            placeholder="Descrição do serviço"
            class="form-control"
            maxlength="45"
          />
        </div>
        <div class="my-2">
          <label for="label" class="d-block fw-bold mb-2"
            >Label de tela do serviço</label
          >
          <input
            type="text"
            id="label"
            v-model="label"
            placeholder="Label de tela do serviço"
            class="form-control"
            maxlength="45"            
          />
        </div>
        <div>
          <label for="vlrDiaria" class="d-block fw-bold mb-2"
            >Valor da Diária do Serviço</label
          >
          <input
            type="number"
            id="vlrDiaria"
            v-model.number="vlrDiaria"
            placeholder="Valor da Diária do Serviço"
            class="form-control"
          />
        </div>
        <div class="formServicosButtons">
          <button
            v-if="showSalvarButton"
            @click="handleClick('salvar')"
            class="btn btn-info my-3 fw-bold text-uppercase text-white"
          >
            Salvar
          </button>
          <button
            v-if="showExcluirButton"
            @click="handleClick('excluir')"
            id="btnExcluir"
            class="btn btn-danger my-3 fw-bold text-uppercase text-red"
            type="button"
          >
            Excluir
          </button>
          <button
            v-if="showCancelarButton"
            @click="handleClick('cancelar')"
            id="btnCancelar"
            class="btn btn-warning my-3 fw-bold text-uppercase text-white"
            type="button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
    <div class="listServicos">
      <table class="table">
        <thead>
          <th scope="col">ID</th>
          <th scope="col">Serviço</th>
          <th scope="col">Descrição</th>
          <th scope="col">Label</th>
          <th scope="col">Vlr Diaria</th>
        </thead>
        <tbody>
          <tr scope="row" v-for="item in items" :key="item.idServicos">
            <td>{{ item.idServicos }}</td>
            <td>{{ item.nomeServico }}</td>
            <td>{{ item.descricaoServico }}</td>
            <td>{{ item.labelServico }}</td>
            <td>{{ item.vlrDiariaServico }}</td>
            <!-- <td>
              <router-link
                :to="{ name: 'editServicos', params: { id: item.idServicos } }"
              >
                <button class="button">Editar</button></router-link
              >
            </td>
            <td>
              <button class="button" @click="deleteServicos(item.idServico)">
                Deletar
              </button>
            </td> -->
            <div class="handleItem w-30 border px-3">
              <button
                @click="handleItem('editar', item.idServicos)"
                id="btnEditar"
                class="btn btn-warning my-3 fw-bold text-uppercase text-white"
                type="button"
              >
                Editar
              </button>
              <button
                @click="handleItem('excluir', item.idServicos)"
                id="btnEditar"
                class="btn btn-warning my-3 fw-bold text-uppercase text-white"
                type="button"
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
import { Servicos } from "@/../adm/src/types/reservas/Servicos.js";
export default {
  name: "ServicosView",
  data() {
    // data
    return {
      msg1: "msg1",
      msg2: "msg2",
      idServico: "",
      nome: "",
      descricao: "",
      label: "",
      vlrDiaria: 0,
      item: [],
      items: [],
      itemArrayServicos: 0,
      itemArrayEdit: false,
      showSalvarButton: true,
      showExcluirButton: false,
      showCancelarButton: false,
    };
  },
  beforeMount() {
    this.checkLogin();
    console.log(this.checkLogin())
  },
  created() {
    this.getServicos();
  },
  setup() {
    // setup...
  },
  components: {
    // components....
  },
  methods: {
    checkLogin() {
      if(localStorage.getItem("loginStatus")){
        if(localStorage.getItem("loginStatus") == "admin")
          return true
        else if(localStorage.getItem("loginStatus") == "cliente")
          this.$router.push("/")
          return true
      }else{
        this.$router.push("/")
        return false
      }
    }, 
    // campos do cabecalho, apoio para desenvolvimento...
    changeName(msg1) {
      this.msg1 = msg1;
    },
    changeAge(msg2) {
      this.msg2 = msg2;
    },
    // Lista todos os servicos
    async getServicos() {
      try {
        const response = await axios.get("http://localhost:5000/servico");
        this.items = response.data;
        // console.log("getServicos", this.items);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // localiza servico pelo id
    async getServicosById(idServico) {
      try {
        const response = await axios.get(
          `http://localhost:5000/servico/${idServico}`
        );
        this.idServico = response.data.idServicos;
        this.nome = response.data.nomeServico;
        this.descricao = response.data.descricaoServico;
        this.label = response.data.labelServico;
        this.vlrDiaria = response.data.vlrDiariaServico;
      } catch (err) {
        console.log(err);
      }
    },
    handleClick(action) {
      console.log("Entrei no handleClick");
      if (action == "salvar") {
        console.log("Entrei no handleClick - salvar");
        const servico = new Servicos();
        console.log("Entrei no handleClick - salvar - intanciei Servicos...",servico)
        servico.salvar(
          this.idServico,
          this.nome,
          this.label,
          this.descricao,
          this.vlrDiaria,
          this.itemArrayServicos,
          this.itemArrayEdit
        );
        // recarrega lista de serviços
        this.getServicos();
      }
      if (action == "cancelar") {
        // não faz nada, a rotina de edição está no "servico.salvar" só desabilita o botão e limpa os campos na rotina que já está abaixo...
        // this.showSalvarButton = true;
        // this.showCancelarButton = false;
        // this.showExcluirButton = false;
      }
      if (action == "excluir") {
        // chama rotina de exclusão, desabilita o botão e limpa os campos na rotina que já está abaixo...
        this.msg1 = "Cliquei handleClick excluir...";
        this.msg2 = `this.idReservas=${this.idServico}`;
        let conf = confirm("Confirma exclusão do serviço?");
        if (conf) {
          let servico = new Servicos();
          servico.excluir(this.idServico);
          // recarrega lista de serviços
          this.getServicos();
        }
      }
      // após inclusão, limpa campos do form...
      this.nome = "";
      this.descricao = "";
      this.label = "";
      this.vlrDiaria = 0;
      // retorna status dos botões...
      this.showSalvarButton = true;
      this.showCancelarButton = false;
      this.showExcluirButton = false;
      this.itemArrayEdit = false;
      return true;
    },
    handleItem(action, idServico) {
      console.log("Entrei no handleItem");
      // let storageServico = new StorageServico(document.querySelector("form"));
      if (action == "editar") {
        this.name = "Cliquei HandleItem edit";
        // atualiza campos do formulário
        this.getServicosById(idServico);
        this.itemArrayEdit = true;
        this.showSalvarButton = true;
        this.showCancelarButton = true;
        this.showExcluirButton = false;
      }
      if (action == "excluir") {
        this.name = "Cliquei HandleItem excluir";
        // atualiza campos do formulário
        this.getServicosById(idServico);
        this.itemArrayEdit = false;
        this.showSalvarButton = false;
        this.showCancelarButton = true;
        this.showExcluirButton = true;
      }
      this.msg2 = `idServico ${idServico}`;
    },
  },
  computed: {
    // incluir funções...
  },
  mounted() {
    // funções mounted...
  },
};
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
