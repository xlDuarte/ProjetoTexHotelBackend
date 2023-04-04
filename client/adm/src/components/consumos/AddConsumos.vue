<template>
  <main>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="shadow bg-light rounded-3 p-4 my-5">
            <form>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label for="roomNumber" class="mb-0 form-label fw-bold ">*Número do quarto:</label>
                  <input type="number" id="quarto" name="Quarto" class="form-control" v-model="quarto" />
                </div>
                <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                  <label for="local" class="mb-0 form-label fw-bold ">*Local do Consumo</label>
                  <select id="localDeConsumo" class="form-control" v-model="localConsumo" @change="updateProdutos">
                    <option value='1'>Frigobar</option>
                    <option value='2'>Cesta</option>
                    <option value='3'>Bar</option>
                  </select>
                </div>
                <div class="col-12 col-md-6 mt-3">
                  <label for="produtoNumber" class="mb-0 form-label fw-bold ">*Produto</label>
                  <select id="produto" class="form-control" v-model="idproduto">
                    <option v-for="produto in filteredProdutos" :value="produto.id" v-bind:key="produto.id">
                      {{ produto.name }}
                    </option>
                  </select>
                </div>
                <div class="col-12 col-md-6 mt-3">
                  <label for="quantity" class="mb-0 form-label fw-bold ">*Quantidade:</label>
                  <input type="text" id="quantidade" name="quantidade" class="form-control" v-model="quantidade" />
                </div>
                <div class="col-12 col-md-6 mt-3">
                  <label for="date" class="mb-0 form-label fw-bold ">*Data:</label>
                  <input type="datetime-local" id="inputDateTime" class="form-control" v-model="data" />
                </div>
              </div>
            </form>
            <button class="btn btn-primary mt-3" @click="saveConsumo">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
// import axios
import axios from "axios";

export default {
  name: "AddConsumo",
  data() {
    return {
      quarto: "",
      localConsumo: "",
      idproduto: "",
      quantidade: "",
      data: "",
      selectedProduto: null,
      produtosFrigobar: [
        { id: 1, name: "Água" },
        { id: 2, name: "Cerveja" },
        { id: 3, name: "Refrigerante" },
      ],
      produtosCesta: [
        { id: 4, name: "Barra Chocolate" },
        { id: 5, name: "Batata Chips" },
        { id: 6, name: "Amendoim" },
      ],
      produtosBar: [
        { id: 7, name: "Café" },
        { id: 8, name: "Pão de queiijo" },
        { id: 1, name: "Água" },
        { id: 9, name: "Lanche" },
        { id: 10, name: "Almoço" },
        { id: 2, name: "Cerveja" },
        { id: 3, name: "Refrigerante" },
      ],
    };
  },
  computed: {
    filteredProdutos() {
      if (this.localConsumo === '1') {
        return this.produtosFrigobar
      } else if (this.localConsumo === '2') {
        return this.produtosCesta
      } else if (this.localConsumo === '3') {
        return this.produtosBar
      } else {
        return []
      }
    }
  },
  methods: {
    // cria novo consumo
    async saveConsumo() {
      try {
        await axios.post("http://localhost:5000/Consumo", {
          Reservas_idReservas: this.quarto,
          localConsumo_idLocalConsumo: parseInt(this.localConsumo),
          produtos_idprodutos: this.idproduto,
          qtdConsumo: this.quantidade,
          dataConsumo: this.data,
        });
        this.quarto = "";
        this.localConsumo = "";
        this.idproduto = "";
        this.quantidade = "";
        this.data = "";
        this.$emit('updateConsumo')
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
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
