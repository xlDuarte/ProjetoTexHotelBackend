<template>
  <div>
    <div>
      <h2>RESERVAS</h2>
      <p>Forneça a data de entrada, saída e quantidade de pessoas.</p>
      <p id="msgAlerta"></p>
    </div>
    <div class="flex minhaReserva" id="formDadosReserva">
      <div>
        <label for="dtEntrada">Entrada</label>
        <input type="date" id="dtEntrada" name="dtEntrada" v-model="dtEntrada" />
        <label for="dtSaida">Saida</label>
        <input type="date" id="dtSaida" name="dtSaida" v-model="dtSaida" />
        <label for="qtPessoas">Quantidade Pessoas</label>
        <input type="number" id="qtPessoas" name="qtPessoas" value="1" />
        <button type="button" class="button" id="btnResumo">
          Fechar reserva!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { json } from "body-parser";

var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

export default {
  name: "FormReserva",
  props: {
    msg: String,
  },
  data() {
    return {
      //
      // inicializa dados form,
      dtEntrada: new Date().toISOString().substring(0, 10),
      dtSaida: new Date().toISOString().substring(0, 10),
      qtPessoas: 1,
    };
  },
  methods: {
    // exemplo...
    // updateBinding() {
    //   let el = document.getElementById("input");
    //   el.value = "Hello!";
    //   el.dispatchEvent(new Event("input"));
    // },
  },
  computed: {
    // produtos() {
    //   return this.$store.$state.produtos.pratosQuentes;
    // },
    // loja() {
    //   console.log(this.tipo);
    //   return this.$store.getters.loja(this.tipo);
    // },
  },
  mounted() {
    // força primeira atualização da localStorage
    atualizaLocalStorage();

    // jquery criado antes que identifica mudanças no form e atualiza localStorage e tela
    // deve ter um outro jeito em VUEX...
    window.$("#dtEntrada").change(function () {
      //console.log("mudou dt entrada");
      atualizaLocalStorage();
    });

    window.$("#dtSaida").change(function () {
      //console.log("mudou dt saida");
      atualizaLocalStorage();
    });

    window.$("#qtPessoas").change(function () {
      //console.log("mudou qt pessoas");
      atualizaLocalStorage();
    });

    window.$("input[type=radio][name=tipoApto]").change(function () {
      if (this.value == "Master") {
        //console.log("Selecionou Master");
      } else if (this.value == "Family") {
        //console.log("Selecionou Family");
      } else {
        //console.log("Selecionou Comfort");
      }
      atualizaLocalStorage();
    });

    // confirmação da reserva e display da modal de confirmação
    window.$().ready(function () {
      window.$("#btnResumo").click(function () {
        let check = false;
        // executa function para checar dados da reserva...
        check = confirmaReserva();
        if (check) {
          window.$("#modalResumo").modal("show");
          preencheModalResumo();
        }
      });
    });
    window.$().ready(function () {
      window.$("#btnServicos").click(function () {
        window.$("#modalServicos").modal("show");
      });
    });
    window.$().ready(function () {
      window.$("#btnConfirma").click(function () {
        window.$("#modalConfirma").modal("show");
      });
    });
  },
};

// verificar depois se estes scripts podem ser transferidos para a store...
// rotina para atualização dos dados na localStorage sempre que houver uma alteração nos campos do form / tipo de suite
export function atualizaLocalStorage() {
  // variaveis form Reservas
  let dtEntrada,
    dtSaida,
    qtPessoas,
    tipoApto,
    dateStart,
    dateEnd,
    dateStartAux,
    difDates,
    dateEndAux,
    dateReserva;

  // limpa mensagem de erro do form...
  document.getElementById("msgAlerta").innerHTML = "";

  // armazena a data atual como data do dia da reserva...
  dateReserva = formatDate(new Date());

  // inicializa cupomDesconto para primeira utilização...checar depois para incluir a data tb.
  if (localStorage.getItem("cupomDescontoValido") == null) {
    localStorage.setItem("cupomDescontoValido", "OK");
  }

  // limpa variavel de valor total com desconto...estava variavel só é gerada na confirmação
  localStorage.removeItem("vlrTotalDesconto");

  // verifica dados input
  dtEntrada = document.querySelector("#dtEntrada").value;
  dtSaida = document.querySelector("#dtSaida").value;
  qtPessoas = document.querySelector("#qtPessoas");
  tipoApto = document.querySelector('input[name = "tipoApto"]:checked').value;

  // inicializa localStorage - datas
  dateStartAux = dtEntrada.split("-");
  //console.log("dataemtradaaux", dateStartAux);
  dateStart = new Date(dateStartAux[0], dateStartAux[1] - 1, dateStartAux[2]);
  localStorage.setItem("dtEntrada", formatDate(dateStart));
  dateEndAux = dtSaida.split("-");
  dateEnd = new Date(dateEndAux[0], dateEndAux[1] - 1, dateEndAux[2]);
  localStorage.setItem("dtSaida", formatDate(dateEnd));

  localStorage.setItem("dtReserva", dateReserva);

  difDates = Math.ceil(dateEnd - dateStart) / (1000 * 60 * 60 * 24);
  localStorage.setItem("difDates", difDates);

  // inicializa localStorage - outros dados
  localStorage.setItem("qtPessoas", qtPessoas.value);
  localStorage.setItem("tipoApto", tipoApto);

  // atualiza dados na tela PainelReserva - dados reserva
  document.getElementById("dtCheckin").innerHTML = `<b> ${localStorage.getItem(
    "dtEntrada"
  )} </b>`;
  document.getElementById("dtCheckout").innerHTML = `<b> ${localStorage.getItem(
    "dtSaida"
  )} </b>`;
  document.getElementById("qtHospedes").innerHTML = `<b> ${localStorage.getItem(
    "qtPessoas"
  )} </b>`;
  document.getElementById(
    "tipoAcomodacao"
  ).innerHTML = `<b> ${localStorage.getItem("tipoApto")} </b>`;

  return true;
}

// atualiza dados do form no início e a cada confirmação de reserva
export function updateBindingForm() {
  let elDtEntrada = document.getElementById("dtEntrada");
  elDtEntrada.value = new Date().toISOString().substring(0, 10);
  elDtEntrada.dispatchEvent(new Event("dtEntrada"));

  let elDtSaida = document.getElementById("dtSaida");
  elDtSaida.value = new Date().toISOString().substring(0, 10);
  elDtSaida.dispatchEvent(new Event("dtSaida"));

  let elQtPessoas = document.getElementById("qtPessoas");
  elQtPessoas.value = 1;
  elQtPessoas.dispatchEvent(new Event("qtPessoas"));

  atualizaLocalStorage();

  return true;
}

export function formatDate(inputDate) {
  let date, month, year;

  // sem converter de novo, dá erro...
  date = new Date(inputDate).getDate();
  month = new Date(inputDate).getMonth() + 1;
  year = new Date(inputDate).getFullYear();

  date = date.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");
  // console.log(inputDate, `${date}/${month}/${year}`);
  return `${date}/${month}/${year}`;
}

export function checkInfo() {
  // recupera dados localStorage
  let msgReturn, dtEntrada, dtSaida, qtPessoas, tipoApto;
  msgReturn = [true, "Dados OK!"];
  dtEntrada = localStorage.getItem("dtEntrada");
  dtSaida = localStorage.getItem("dtSaida");
  qtPessoas = localStorage.getItem("qtPessoas");
  tipoApto = localStorage.getItem("tipoapto");

  if (localStorage.getItem("loginStatus") != "cliente") {
    alert("Você precisa estar logado para concluir a reserva!");
    msgReturn = [false, "Você precisa estar logado para concluir a reserva!"];
  }

  if (checkData(dtEntrada) || checkData(dtSaida)) {
    msgReturn = [false, "Datas de entrada e/ou saída inválidas"];
  }

  let dataReserva = localStorage.getItem("dtReserva");

  if (
    processDate(dtEntrada) < processDate(dataReserva) ||
    dtEntrada == "" ||
    dtSaida == "" ||
    processDate(dtSaida) <= processDate(dtEntrada)
  ) {
    msgReturn = [false, "Datas de entrada e/ou saída inválidas"];
  }

  if (qtPessoas == 0) {
    msgReturn = [false, "Quantidade de pessoas inválido"];
  }

  if (tipoApto == "") {
    msgReturn = [false, "Tipo de apartamento não selecionado"];
  }

  return msgReturn;
}

// processa data para efeito de comparação...
export function processDate(date) {
  var parts = date.split("/");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

export function checkData(data) {
  return data instanceof Date && !isNaN(data);
}

export function confirmaReserva() {
  let validadorDados,
    dadosOk,
    qtdDiarias,
    vlrDiaria,
    valorTotalDiarias,
    msgRetorno;

  // define dados dos quartos... REVER - TEM QUE VIR DO BANCO!!!!
  const dadosQuartos = [
    { tipo: "master", diaria: 600, ocupacao: 6 },
    { tipo: "family", diaria: 400, ocupacao: 4 },
    { tipo: "comfort", diaria: 200, ocupacao: 1 },
  ];

  validadorDados = checkInfo();
  dadosOk = validadorDados[0];
  msgRetorno = validadorDados[1];

  // exibe mensagem de erro se necessário
  document.getElementById("msgAlerta").innerHTML = "";
  if (dadosOk == false) {
    document.getElementById("msgAlerta").innerHTML = `${msgRetorno}`;
    return false;
  }

  // preenche servicos na tela inicial
  // atualiza novamente a localStorage, a tela e prepara calculo
  atualizaLocalStorage();

  qtdDiarias = localStorage.getItem("difDates"); // recupera diferença dos dias da localStorage
  vlrDiaria = 0;

  //obter vlrDiaria do array de aptos...REVER - TEM QUE VIR DO BANCO!!!!
  dadosQuartos.some(function (entry) {
    if (entry.tipo == localStorage.getItem("tipoApto")) {
      vlrDiaria = entry.diaria;
    }
  });
  localStorage.setItem("valorDiaria", vlrDiaria);

  valorTotalDiarias =
    qtdDiarias * vlrDiaria * localStorage.getItem("qtPessoas");
  localStorage.setItem("valorTotalDiarias", valorTotalDiarias);

  return true;
}

export function gravaReserva() {
  let idUsuario = localStorage.getItem("userId");
  let dateStart = localStorage.getItem("dtEntrada");
  let dateEnd = localStorage.getItem("dtSaida");
  let qtPessoas = localStorage.getItem("qtPessoas");
  let difDates = localStorage.getItem("difDates");
  let tipoApto = localStorage.getItem("tipoApto");
  let dtReserva = localStorage.getItem("dtReserva");
  let vlrTotal = localStorage.getItem("valorTotalGeral");
  let vlrTotalcomDesconto = localStorage.getItem("vlrTotalDesconto");
  let cupom = localStorage.getItem("cupomDesconto");
  let taxaDescontoCupom = 10;

  // cria json com todos os dados...
  // gravando na localStorage = JSON.stringify
  // recupeando da localSorage = JSON.parse

  let novoId = 1;
  if (localStorage.getItem("reservaId")) {
    // verifica ultimo id para definir id da reserva a partir do mesmo
    novoId = parseInt(localStorage.getItem("reservaId")) + 1;
  }

  localStorage.setItem("reservaId", novoId);
  let ReservaAux = [
    {
      reservaId: `Reserva_${novoId}`,
      dtReserva: `${dtReserva}`,
      codCliente: `${localStorage.getItem("loged")}`,
      idUsuario: `${idUsuario}`,
      dtEntrada: `${dateStart}`,
      dtSaida: `${dateEnd}`,
      qtPessoas: `${qtPessoas}`,
      tipoApto: `${tipoApto}`,
      diarias: `${difDates}`,
      vlrTotal: `${vlrTotal}`,
      vlrTotalcomDesconto: `${vlrTotalcomDesconto}`,
      cupom: `${cupom}`,
      taxaDescontoCupom: `${taxaDescontoCupom}`
    },
  ];
  localStorage.setItem(`Reserva_${novoId}`, JSON.stringify(ReservaAux));
  limpaLocalStorage();

  return true;
}

export function limpaLocalStorage() {
  // zera servicos...
  localStorage.setItem("dtEntrada", "");
  localStorage.setItem("dtSaida", "");
  localStorage.setItem("qtPessoas", "");
  localStorage.setItem("difDates", "");
  localStorage.setItem("tipoApto", "");
  localStorage.setItem("dtReserva", "");
  localStorage.setItem("valorTotalGeral", "");
  localStorage.setItem("vlrTotalDesconto", "");
  localStorage.setItem("cupomDesconto", "");
}
export function currencyFormat(strVlr) {
  // Intl.NumberFormat JavaScript has a number formatter (part of the Internationalization API).
  const options = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  };
  const formatter = new Intl.NumberFormat("pt-BR", options);
  return formatter.format(strVlr); /* $2,500.00 */
}

export function preencheModalResumo() {
  const divServicos = document.getElementById("servicos");
  //console.log("Entrei na preenche modal resumo.;;;", divServicos);
  const divDiarias = document.getElementById("diarias");
  //console.log("Entrei na preenche modal resumo.;;;", divDiarias);
  const divTotal = document.getElementById("total");

  let servicosEscolhidos = "";
  if (localStorage.getItem("servicosEscolhidos") != null) {
    //let arrayServicosEscolhidos = JSON.parse(localStorage.getItem("servicosEscolhidos"));
    let arrayServicosEscolhidos = localStorage.getItem("servicosEscolhidos");
    console.log("PreencheModalResumo...", arrayServicosEscolhidos);
    servicosEscolhidos = JSON.parse(arrayServicosEscolhidos);
  }

  // limpa div para eliminar seleções anteriores...
  while (divServicos.hasChildNodes()) {
    divServicos.removeChild(divServicos.firstChild);
  }

  // limpa div para eliminar seleções anteriores...
  while (divDiarias.hasChildNodes()) {
    divDiarias.removeChild(divDiarias.firstChild);
  }

  // limpa div para eliminar seleções anteriores...
  while (divTotal.hasChildNodes()) {
    divTotal.removeChild(divTotal.firstChild);
  }

  // recupera diferença dos dias da localStorage - quantidade de diarias
  let qtdDiarias = localStorage.getItem("difDates");
  // inicializa variaveis para calculo de valores de serviços...
  let vlrTotalServico = 0;
  let vlrSomaServicos = 0;

  // processo
  // cria elemento P
  let paraTexto = "";
  // atualiza div Diarias - apto selecionado, quantidade diarias, valor das diarias, nr de pessoas, valor total
  paraTexto = "Apto selecionado: " + localStorage.getItem("tipoApto");
  document.getElementById("diarias").appendChild(createPara(paraTexto));

  paraTexto = "Quantidade hospedes: " + localStorage.getItem("qtPessoas");
  document.getElementById("diarias").appendChild(createPara(paraTexto));

  paraTexto = "Quantidade diarias: " + localStorage.getItem("difDates");
  document.getElementById("diarias").appendChild(createPara(paraTexto));

  paraTexto =
    "Valor diaria: " +
    currencyFormat(localStorage.getItem("valorDiaria")) +
    "<br />";
  document.getElementById("diarias").appendChild(createPara(paraTexto));

  paraTexto =
    "Valor total diarias: " +
    currencyFormat(localStorage.getItem("valorTotalDiarias")) +
    "<br />";
  document.getElementById("diarias").appendChild(createPara(paraTexto));

  // atualiza div servicos se houver...
  console.log("Atualiza div...", servicosEscolhidos)
  if (servicosEscolhidos !== "") {
    for (let i = 0; i < servicosEscolhidos.length; i++) {
      vlrTotalServico = servicosEscolhidos[i].vlrDiariaServico * qtdDiarias;
      vlrSomaServicos = vlrSomaServicos + vlrTotalServico;
      paraTexto =
        servicosEscolhidos[i].nomeServico +
        " - Diária: " +
        currencyFormat(servicosEscolhidos[i].vlrDiariaServico) +
        " - Total: " +
        currencyFormat(vlrTotalServico) +
        "<br />";
      document.getElementById("servicos").appendChild(createPara(paraTexto));
    }
    localStorage.setItem("valorTotalServicos", vlrSomaServicos);
  } else {
    paraTexto = "<br />";
    document
      .getElementById("servicos")
      .appendChild(createPara("Sem serviços adicionais"));
    localStorage.setItem("valorTotalServicos", 0);
  }

  let valorTotalGeral = vlrSomaServicos + parseFloat(localStorage.getItem("valorTotalDiarias"));

  // grava valor geral
  localStorage.setItem("valorTotalGeral", valorTotalGeral);
  // repete valor geral para total com desconto, será utilizado em outra função...
  localStorage.setItem("vlrTotalDesconto", valorTotalGeral);

  // atualiza div total
  paraTexto =
    "Total diarias: " + currencyFormat(localStorage.getItem("valorTotalDiarias")) + "<br />";
  document.getElementById("total").appendChild(createPara(paraTexto));

  paraTexto =
    "Total servicos: " + currencyFormat(localStorage.getItem("valorTotalServicos")) + "<br />";
  document.getElementById("total").appendChild(createPara(paraTexto));

  paraTexto =
    "Total geral: " + currencyFormat(localStorage.getItem("valorTotalGeral")) + "<br />";
  document.getElementById("total").appendChild(createPara(paraTexto));

  return true;
}

export function createPara(conteudo) {
  var para = document.createElement("p");
  // exemplo aplicado
  // para.style.cssText = "background-color:pink;font-size:55px;border:2px dashed green;color:black;"
  para.style.cssText =
    "font-size:15px; color:black, line-height: 10px; margin-bottom: 10px;";
  para.innerHTML = conteudo;
  return para;
}

// line-height: 10px;   /* within paragraph */
// margin-bottom: 5px; /* between paragraphs */
export function cupomDesconto() {
  let cupom = Math.random().toString(36).substring(2, 9);
  return cupom;
}

export function aplicaDesconto() {
  //
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

.sec h2,
h2 {
  font-size: 3em;
}

.sec h3,
.sec h4,
h3 {
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

.sec p,
p {
  font-size: 1.2em;
  font-weight: 300;
}

img {
  width: 523px;
  height: 294px;
  display: block;
  border-radius: 20px;
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
  padding: 0.4em;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  font-size: 1.5em;
}

.flex>div>button {
  margin-right: 10px;
}

.flex>div>label {
  margin-right: 10px;
}

.flex>div>input {
  max-width: 125px;
  margin-right: 10px;
}

#qtPessoas {
  max-width: 50px;
  margin-right: 10px;
}

.button:hover {
  background: #112434;
  color: #fff;
  border-radius: 50px;
  padding: 0.4em;
}
</style>
