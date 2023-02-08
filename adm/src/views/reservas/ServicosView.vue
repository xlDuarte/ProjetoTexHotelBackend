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
        <div>
          <!-- <input class="button" type="submit" value="Submit" /> -->
          <button
            @click="handleClick('salvar')"
            class="btn btn-info my-3 fw-bold text-uppercase text-white"
          >
            Salvar
          </button>
          <button
            @click="handleClick('editar')"
            id="btnEditar"
            class="btn btn-warning my-3 fw-bold text-uppercase text-white d-none"
            type="button"
          >
            Editar
          </button>
        </div>
      </form>
    </div>
    <div class="boxListagem">
      <div class="container w-50 boxListagem_info">
        <div class="boxListagem_head d-flex w-100">
          <div class="w-25 border px-3">ID</div>
          <div class="w-25 border px-3">Nome Abrev.</div>
          <div class="w-25 border px-3">Descrição</div>
          <div class="w-25 border px-3">Label</div>
          <div class="w-25 border px-3">Valor Diaria</div>
          <div class="w-25 border px-3"></div>
        </div>
        <div class="boxListagem_body container d-flex w-100">
          <p>Servicos</p>
          <p>{{ listaServico }}</p>
        </div>
      </div>

      <!-- <div class="painelServicos" v-for="item in servicos2" :key="item">
            <input
              type="checkbox"
              :id="item.id"
              :name="item.name"
              :value="item.label"
            />
            <label>{{ item.descricao }} - R$ {{ item.vlrDiaria }} </label>
            <br />
          </div> -->
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
      name: "LinkRef",
      age: 25,
      nome: "",
      descricao: "",
      label: "",
      vlrDiaria: 0,
      listaServico: "",
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
        // let storageServico = new StorageServico(document.querySelector("form"));
        console.log(
          "Cliquei em salvar! Dados: ",
          this.nome,
          this.descricao,
          this.vlrDiaria
        );
        let servico = new Servicos();
        servico.salvar(this.nome, this.label, this.descricao, this.vlrDiaria);
        console.log(servico);
        (this.nome = ""),
          (this.descricao = ""),
          (this.label = ""),
          (this.vlrDiaria = 0);
      }
    },
    // onSubmit() {
    //   console.log("Cheguei aqui....");
    //   let servicoDados = {
    //     nome: this.nome,
    //     descricao: this.descricao,
    //     label: this.label,
    //     vlrDiaria: this.vlrDiaria,
    //   };
    //   this.$emit("servicoIncluido", servicoDados);
    //   (this.nome = ""),
    //     (this.descricao = ""),
    //     (this.label = ""),
    //     (this.vlrDiaria = 0);
    // },
  },
  computed: {
    servicos2() {
      return this.$store.getters.servicos2;
    },
  },
  mounted() {
    let servico = new Servicos();
    servico.listaServicos("boxListagem_body")
  }
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
