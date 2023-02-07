<template>
  <main>
    <div class="container-fluid" style="max-width: 500px">
      <form>
        <div class="form-group">
          <label for="roomNumber">Número do quarto:</label>
          <input type="number" id="quarto" name="Quarto" class="form-control" />
        </div>
        <div class="form-group">
          <select
            id="localDeConsumo"
            class="form-control"
            v-model="selectedGroup"
            @change="updateProdutos"
          >
            <option value="Frigobar">Frigobar</option>
            <option value="Cesta">Cesta</option>
            <option value="Bar">Bar</option>
          </select>

          <select id="produto" class="form-control" v-model="selectedProduto">
            <option v-for="produto in filteredProdutos" :value="produto.id" v-bind:key="produto.id">

              {{ produto.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="quantity">Quantidade:</label>
          <input
            type="text"
            id="quantidade"
            name="quantidade"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="date">Data:</label>
          <input
            type="datetime-local"
            id="inputDateTime"
            class="form-control"
          />
          <button
            type="button"
            class="btn btn-primary"
            @click="criarConsumo"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>

    <h2 class="text-center">Relatório de Consumos</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Quarto</th>
          <th>ID do Produto</th>
          <th>Valor</th>
          <th>Quantidade</th>
          <th>Total</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody id="table-body"></tbody>
    </table>
  </main>
</template>

<script>
var id = 1;
class LocalDeConsumo {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.products = {};
  }
  addProduct(id, product) {
    this.products[id] = product;
  }
  getProducts() {
    return this.products;
  }
  getProductData(productId) {
    return this.products[productId];
  }
}
class Consumo {
  constructor(id) {
    this.products = {};
    this.totalValue = 0;
    this.id = id;
  }
  consumeProduct(localDeConsumo, productId) {
    const product = localDeConsumo.getProductData(productId);
    if (!product) {
      console.error(`Produto com o id ${productId} não existe.`);
      return;
    }
    this.products[productId] = product;
    this.totalValue += product.value;
  }
  getTotalValue() {
    return this.totalValue;
  }
}
class ConsumoData {
  constructor(quarto, produto, valor, quantidade, total, dataHora) {
    this.quarto = quarto;
    this.produto = produto;
    this.valor = valor;
    this.quantidade = quantidade;
    this.total = total;
    this.dataHora = dataHora;
  }
}
var consumos = [];
const product1 = { name: "Água", value: 5 };
const product2 = { name: "Cerveja", value: 12 };
const product3 = { name: "Refrigerante", value: 7 };
const product4 = { name: "Barra de chocolate", value: 10 };
const product5 = { name: "Batata Chips", value: 4 };
const product6 = { name: "Amendoim", value: 5 };
const product7 = { name: "Café", value: 3 };
const product8 = { name: "Pão de queijo", value: 3 };
const product9 = { name: "Lanche", value: 12 };
const product10 = { name: "Almoço", value: 25 };
const Frigobar = new LocalDeConsumo("Frigobar", 1);
Frigobar.addProduct(1, product1);
Frigobar.addProduct(2, product2);
Frigobar.addProduct(3, product3);
const Cesta = new LocalDeConsumo("Cesta", 2);
Cesta.addProduct(4, product4);
Cesta.addProduct(5, product5);
Cesta.addProduct(6, product6);
const Bar = new LocalDeConsumo("Bar", 3);
Bar.addProduct(7, product7);
Bar.addProduct(8, product8);
Bar.addProduct(1, product1);
Bar.addProduct(9, product9);
Bar.addProduct(10, product10);
Bar.addProduct(2, product2);
Bar.addProduct(3, product3);


export default {
  name: "RalatorioConsumo",
  mounted(){
    this.tableBody = document.querySelector("#table-body")
    console.log(this.tableBody)
  }, 
  data() {
        return{
            tableBody:null,
            selectedGroup:'Frigobar',
            selectedProduto: null,
            produtosFrigobar : [
            { id: 1, name: "Água" },
            { id: 2, name: "Cerveja" },
            { id: 3, name: "Refrigerante" }
            ],
            produtosCesta : [
            { id: 4, name: "Barra Chocolate" },
            { id: 5, name: "Batata Chips" },
            { id: 6, name: "Amendoim" }
            ],
            produtosBar : [
            { id: 7, name: "Café" },
            { id: 8, name: "Pão de queiijo" },
            { id: 1, name: "Água" },
            { id: 9, name: "Lanche" },
            { id: 10, name: "Almoço" },
            { id: 2, name: "Cerveja" },
            { id: 3, name: "Refrigerante" }
            ]
        }
  },
  computed: {
    filteredProdutos() {
      if (this.selectedGroup === 'Frigobar') {
        return this.produtosFrigobar
      } else if (this.selectedGroup === 'Cesta') {
        return this.produtosCesta
      } else if (this.selectedGroup === 'Bar') {
        return this.produtosBar
      }else{
        return[]
      }
    }
  },
  methods: {
    criarConsumo(quarto, dataConsumo) {
      const input = document.getElementById("quarto");
      quarto = parseInt(input.value);
      const date = document.getElementById("inputDateTime");
      dataConsumo = new Date(date.value);
      let formattedDate = `${dataConsumo.getDate()}/${
        dataConsumo.getMonth() + 1
      }/${dataConsumo.getFullYear()}`;
      const produto = document.getElementById("produto");
      const produtoid = parseInt(produto.value);
      const localDeConsumo = document.getElementById("localDeConsumo");
      const local = localDeConsumo.value;
      const quantidade = document.getElementById("quantidade");
      const quantidadeProduct = parseInt(quantidade.value);
      const consumo = new Consumo(id);
      if (local == "Frigobar") {
        consumo.consumeProduct(Frigobar, produtoid);
      }
      if (local == "Cesta") {
        consumo.consumeProduct(Cesta, produtoid);
      }
      if (local == "Bar") {
        consumo.consumeProduct(Bar, produtoid);
      }
      const total = consumo.getTotalValue() * quantidadeProduct;
      const valor = consumo.getTotalValue();
      console.log(quarto)
      console.log(produtoid)
      console.log(valor)
      console.log(quantidadeProduct)
      console.log(total)
      console.log(formattedDate)
      const novoconsumo = new ConsumoData(
        quarto,
        produtoid.toString(),
        valor,
        quantidadeProduct,
        total,
        formattedDate.toString()
      );
      consumos.push(novoconsumo);
      console.log(consumos)
      if (consumos.length != 0) {
        consumos.forEach((consumo) => {
          const tr = document.createElement("tr");
          const tdQuarto = document.createElement("td");
          tdQuarto.innerText = consumo.quarto.toString();
          if (tdQuarto != null) {
                tr.appendChild(tdQuarto);
            }
          const tdProduto = document.createElement("td");
          tdProduto.innerText = consumo.produto;
          if (tdProduto != null) {
                tr.appendChild(tdProduto);
            }
          const tdValor = document.createElement("td");
          tdValor.innerText = consumo.valor.toString();
          if (tdValor!= null) {
                tr.appendChild(tdValor);
            }
          const tdQuantidade = document.createElement("td");
          tdQuantidade.innerText = consumo.quantidade.toString();
          if (tdQuantidade != null) {
                tr.appendChild(tdQuantidade);
            }
          const tdTotal = document.createElement("td");
          tdTotal.innerText = consumo.total.toString();
          if (tdTotal != null) {
                tr.appendChild(tdTotal);
            }
          const tdDataHora = document.createElement("td");
          tdDataHora.innerText = consumo.dataHora.toLocaleString();
          if (tdDataHora != null) {
                tr.appendChild(tdDataHora);
            }
          if (tr != null) {
                this.tableBody.appendChild(tr);
            }
        });
      }
      consumos = [];
      return;
    },
     updateProdutos() {
      this.selectedProduto = null
    },
  },
};
</script>
