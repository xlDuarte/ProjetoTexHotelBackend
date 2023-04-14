<template>
  <div class="sec">
    <div class="text-center">
      <h2>GESTÃO DE COMENTÁRIOS</h2>
    </div>

    <!-- <div class="d-flex flex-wrap justify-content-center">
  <div class="shadow bg-light rounded-3 p-4 my-5 col-md-8 col-lg-6">
    <form class="formServicos" action="" @submit.prevent>

      <div class="container">
        <div class="row my-2">

          <div class="col-md-6">
            <label for="nome" class="form-label fw-bold">*Nome:</label>
            <input type="text" id="nome" v-model="nome" placeholder="Abreviação do serviço"
              class="form-control" maxlength="45" />
          </div>

          <div class="col-md-6 mt-3 mt-md-0">
            <label for="descricao" class="form-label fw-bold">*Descriçao:</label>
            <input type="text" id="descricao" v-model="descricao" placeholder="Descrição do serviço"
              class="form-control" maxlength="45" />
          </div>

          <div class="col-md-6 mt-3">
            <label for="label" class="form-label fw-bold">*Label do serviço</label>
            <input type="text" id="label" v-model="label" placeholder="Label de tela do serviço"
              class="form-control" maxlength="45" />
          </div>

          <div class="col-md-6 mt-3">
            <label for="vlrDiaria" class="form-label fw-bold">*Valor</label>
            <input type="number" id="vlrDiaria" v-model.number="vlrDiaria" placeholder="Valor da Diária do Serviço"
              class="form-control" />
          </div>

          <div class="col-12 d-flex justify-content-center mt-4">
            <div class="formServicosButtons">
              <button v-if="showSalvarButton" @click="handleClick('salvar')" class="btn btn-primary mx-2">
                Cadastrar
              </button>
              <button v-if="showExcluirButton" @click="handleClick('excluir')" id="btnExcluir"
                class="btn btn-danger mx-2 fw-bold text-uppercase text-red" type="button">
                Excluir
              </button>
              <button v-if="showCancelarButton" @click="handleClick('cancelar')" id="btnCancelar"
                class="btn btn-warning mx-2 fw-bold text-uppercase text-white" type="button">
                Cancelar
              </button>
            </div>
          </div>

        </div>
      </div>

    </form>
  </div>
</div> -->

    <div class="listComentarios">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <th scope="col">ID Reserva</th>
            <th scope="col">Cliente</th>
            <th scope="col">Data</th>
            <th scope="col">Comentario</th>
            <th scope="col">Status</th>
          </thead>
          <tbody>
            <tr scope="row" v-for="item in comments" :key="item._id">
              <td>{{ item.idReserva }}</td>
              <td>{{ item.nome }}</td>
              <td>{{ item.dataComentario }}</td>
              <td>{{ item.comentario }}</td>
              <td>{{ item.statusComentario }}</td>
              <td>
                <div class="handleItem w-30 border px-3">
                  <button
                    @click="handleItem('editar', item.id)"
                    id="btnEditar"
                    class="btn btn-warning my-3 fw-bold text-uppercase text-white"
                    type="button"
                  >
                    Publicar
                  </button>
                  <button
                    @click="handleItem('excluir', item.id)"
                    id="btnEditar"
                    class="btn btn-warning my-3 fw-bold text-uppercase text-white"
                    type="button"
                  >
                    Cancelar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import { Servicos } from "@/../adm/src/types/reservas/Servicos.js";
export default {
  name: "ComentariosView",
  data() {
    // data
    return {
      msg1: "msg1",
      msg2: "msg2",
      comments: [],
    };
  },

  async created() {
    // const response = await fetch('https://example.com/comments.json');
    const response = await fetch("http://localhost:5000/comentarios/");
    this.comments = await response.json();
  },

  beforeMount() {
    this.checkLogin();
    console.log(this.checkLogin());
  },
  // created() {
  //   this.getServicos();
  // },
  setup() {
    // setup...
  },
  components: {
    // components....
  },
  methods: {
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
    // functions...

    // // Lista todos os servicos
    // async getServicos() {
    //   try {
    //     const response = await axios.get("http://localhost:5000/servico");
    //     this.items = response.data;
    //     // console.log("getServicos", this.items);
    //     return response.data;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // // localiza servico pelo id
    // async getServicosById(idServico) {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:5000/servico/${idServico}`
    //     );
    //     this.idServico = response.data.idServicos;
    //     this.nome = response.data.nomeServico;
    //     this.descricao = response.data.descricaoServico;
    //     this.label = response.data.labelServico;
    //     this.vlrDiaria = response.data.vlrDiariaServico;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // handleClick(action) {
    //   console.log("Entrei no handleClick");
    //   if (action == "salvar") {
    //     console.log("Entrei no handleClick - salvar");
    //     const servico = new Servicos();
    //     console.log(
    //       "Entrei no handleClick - salvar - intanciei Servicos...",
    //       servico
    //     );
    //     servico.salvar(
    //       this.idServico,
    //       this.nome,
    //       this.label,
    //       this.descricao,
    //       this.vlrDiaria,
    //       this.itemArrayServicos,
    //       this.itemArrayEdit
    //     );
    //     // recarrega lista de serviços
    //     this.getServicos();
    //   }
    //   if (action == "cancelar") {
    //     // não faz nada, a rotina de edição está no "servico.salvar" só desabilita o botão e limpa os campos na rotina que já está abaixo...
    //     // this.showSalvarButton = true;
    //     // this.showCancelarButton = false;
    //     // this.showExcluirButton = false;
    //   }
    //   if (action == "excluir") {
    //     // chama rotina de exclusão, desabilita o botão e limpa os campos na rotina que já está abaixo...
    //     this.msg1 = "Cliquei handleClick excluir...";
    //     this.msg2 = `this.idReservas=${this.idServico}`;
    //     let conf = confirm("Confirma exclusão do serviço?");
    //     if (conf) {
    //       let servico = new Servicos();
    //       servico.excluir(this.idServico);
    //       // recarrega lista de serviços
    //       this.getServicos();
    //     }
    //   }
    //   // após inclusão, limpa campos do form...
    //   this.nome = "";
    //   this.descricao = "";
    //   this.label = "";
    //   this.vlrDiaria = 0;
    //   // retorna status dos botões...
    //   this.showSalvarButton = true;
    //   this.showCancelarButton = false;
    //   this.showExcluirButton = false;
    //   this.itemArrayEdit = false;
    //   return true;
    // },
    handleItem(action) {
      console.log("Entrei no handleItem");
      // let storageServico = new StorageServico(document.querySelector("form"));
      if (action == "editar") {
        alert("Funcionalidade em desenvolvimento - Release 2");
      }
      if (action == "excluir") {
        alert("Funcionalidade em desenvolvimento - Release 2");
      }
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
.button {
  background: transparent;
  color: black;
  padding: 5px;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
}

.button:hover {
  background: #112434;
  color: #fff;
  border-radius: 50px;
  padding: 5px;
}
</style>
