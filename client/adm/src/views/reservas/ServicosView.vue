<template>
  <div class="sec">
    <h4>ServicosView.vue</h4>
    <hr />
    <p>Teste nome: {{ name }}</p>
    <span>Teste idade: {{ age }}</span>
    <p></p>
    <button @click="changeName('Mudei o nome!')">Teste botão muda nome</button>
    <button @click="changeAge(60)">teste botão muda idade</button>
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
            class="btn btn-warning my-3 fw-bold text-uppercase text-red"
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
    <div class="boxListagem">
      <div class="container w-50 boxListagem_info">
        <div class="boxListagem_head container d-flex w-100">
          <div class="w-10 border px-3">ID</div>
          <div class="w-15 border px-3">Nome Abrev.</div>
          <div class="w-25 border px-3">Descrição</div>
          <div class="w-10 border px-3">Label</div>
          <div class="w-10 border px-3">Valor Diaria</div>
          <div class="w-30 border px-3"></div>
        </div>
        <div
          class="boxListagem_body container d-flex w-100"
          v-for="item in servicos2"
          :key="item"
        >
          <div class="w-10 border px-3">{{ item.id }}</div>
          <div class="w-15 border px-3">{{ item.nome }}</div>
          <div class="w-25 border px-3">{{ item.descricao }}</div>
          <div class="w-10 border px-3">{{ item.label }}</div>
          <div class="w-10 border px-3">R$ {{ item.vlrDiaria }}</div>
          <div class="handleItem w-30 border px-3">
            <button
              @click="handleItem('editar', item.id)"
              id="btnEditar"
              class="btn btn-warning my-3 fw-bold text-uppercase text-white"
              type="button"
            >
              Editar
            </button>
            <button
              @click="handleItem('excluir', item.id)"
              id="btnEditar"
              class="btn btn-warning my-3 fw-bold text-uppercase text-white"
              type="button"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Servicos } from "@/../adm/src/types/reservas/Servicos.js";

// import { StorageServico } from "@/../adm/src/types/reservas/StorageServico.js";
// import FormReserva from "@/components/reserva/FormReserva.vue";
// import PainelAcomodacoes from "@/components/reserva/PainelAcomodacoes.vue";
// import PainelReserva from "@/components/reserva/PainelReserva.vue";

export default {
  name: "ServicosView",
  data() {
    // data
    return {
      name: "Campo Name",
      age: 25,
      nome: "",
      descricao: "",
      label: "",
      vlrDiaria: 0,
      servicos2: "",
      itemArrayServicos: 0,
      showSalvarButton: true,
      showExcluirButton: false,
      showCancelarButton: false,
      // servicos2: [
      //   {
      //     id: "servico99",
      //     nome: "servico1",
      //     label: "cafeQuarto",
      //     descricao: "Cafe da Manhã no Quarto",
      //     vlrDiaria: 100,
      //   },
      //   {
      //     id: "servico98",
      //     nome: "servico2",
      //     label: "5G",
      //     descricao: "Internet 5G",
      //     vlrDiaria: 50,
      //   },
      // ],
    };
  },
  setup() {},
  components: {
    // FormReserva,
    // PainelReserva,
    // PainelAcomodacoes,
  },
  methods: {
    changeName(name) {
      this.name = name;
    },
    changeAge(age) {
      this.age = age;
    },
    handleClick(action) {
      console.log("Entrei no handleClick");
      // let storageServico = new StorageServico(document.querySelector("form"));
      if (action == "salvar") {
        let servico = new Servicos();
        servico.salvar(
          this.nome,
          this.label,
          this.descricao,
          this.vlrDiaria,
          this.showCancelaButton
        );
        // recarrega lista de serviços
        this.servicos2 = JSON.parse(localStorage.getItem("servicoAdm"));
        this.name = "Cliquei HandleClick";
      }
      if (action == "cancelar") {
        // não faz nada, a rotina de edição está no "servico.salvar" só desabilita o botão e limpa os campos na rotina que já está abaixo...

        this.showSalvarButton = true;
        this.showCancelarButton = false;
        this.showExcluirButton = false;
      }

      if (action == "excluir") {
        // não faz nada, só desabilita o botão e limpa os campos na rotina que já está abaixo...
        let servico = new Servicos();
        servico.excluirServico(this.itemArrayServicos);
        this.servicos2 = JSON.parse(localStorage.getItem("servicoAdm"));
        this.showSalvarButton = true;
        this.showCancelarButton = false;
        this.showExcluirButton = false;
      }

      // após inclusão, limpa campos do form...
      this.nome = "";
      this.descricao = "";
      this.label = "";
      this.vlrDiaria = 0;
    },
    handleItem(action, id) {
      console.log("Entrei no handleItem");
      // let storageServico = new StorageServico(document.querySelector("form"));
      if (action == "editar") {
        this.name = "Cliquei HandleItem edit";
        this.preencheFormEdit(id);
        this.showSalvarButton = true;
        this.showCancelarButton = true;
        this.showExcluirButton = false;
      }
      if (action == "excluir") {
        this.name = "Cliquei HandleItem excluir";
        this.preencheFormEdit(id);
        this.showSalvarButton = false;
        this.showCancelarButton = true;
        this.showExcluirButton = true;
      }
      this.age = id;
    },
    preencheFormEdit(idSelecao) {
      let arrayServicos = JSON.parse(localStorage.getItem("servicoAdm"));
      console.log(
        "arrayServicos",
        arrayServicos,
        arrayServicos[0].id,
        arrayServicos[0].nome
      );
      // daqui sai o id para controlar exclusão e edição...utilizar!!!!
      for (let i = 0; i < arrayServicos.length; i++) {
        console.log(
          "arrayServicos2",
          idSelecao,
          arrayServicos,
          arrayServicos[i].id,
          arrayServicos[i].nome
        );
        if (arrayServicos[i].id === idSelecao) {
          this.nome = arrayServicos[i].nome;
          this.descricao = arrayServicos[i].descricao;
          this.label = arrayServicos[i].label;
          this.vlrDiaria = arrayServicos[i].vlrDiaria;
          this.itemArrayServicos = i;
        }
      }
      //this.showCancelaButton = true;
      return true;
    },
  },
  computed: {
    // incluir funções...
  },
  mounted() {
    if (localStorage.getItem("servicoAdm")) {
      this.servicos2 = JSON.parse(localStorage.getItem("servicoAdm"));
    } else {
      this.servicos2 = "";
    }
    let servico = new Servicos();
    servico.listaServicos("boxListagem_body");
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
