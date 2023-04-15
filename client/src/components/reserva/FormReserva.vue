<template>
  <div>
    <div>
      <h2>RESERVAS</h2>
      <p>Forneça a data de entrada, saída e quantidade de pessoas.</p>
      <p id="msgAlerta"></p>
    </div>
    <div class="row minhaReserva" id="formDadosReserva">
      <div class="col-md-4">
        <div class="form-group mx-3">
          <label for="dtEntrada">Entrada</label>
          <input
            type="date"
            id="dtEntrada"
            name="dtEntrada"
            v-model="dtEntrada"
            class="form-control form-control-lg"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group mx-3">
          <label for="dtSaida">Saida</label>
          <input
            type="date"
            id="dtSaida"
            name="dtSaida"
            v-model="dtSaida"
            class="form-control form-control-lg"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group mx-3">
          <label for="qtPessoas">Quantidade Pessoas</label>
          <input
            type="number"
            id="qtPessoas"
            name="qtPessoas"
            value="1"
            class="form-control"
            style="text-align: center"
          />
        </div>
      </div>
      <div class="col-md-12">
        <button type="button" class="button" id="btnResumo">
          Fechar reserva!
        </button>
      </div>
    </div>
  </div>
</template>

<script>

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
  computed: {},
  mounted() {
    // força primeira atualização da localStorage
    atualizaLocalStorage();

    // jquery criado antes que identifica mudanças no form e atualiza localStorage e tela
    // deve ter um outro jeito em VUEX...
    window.$("#dtEntrada").change(function () {
      atualizaLocalStorage();
    });

    window.$("#dtSaida").change(function () {
      atualizaLocalStorage();
    });

    window.$("#qtPessoas").change(function () {
      atualizaLocalStorage();
    });

    window.$("input[type=radio][name=tipoApto]").change(function () {
      atualizaLocalStorage();
    });

    // confirmação da reserva e display da modal de confirmação
    window.$().ready(function () {
      window.$("#btnResumo").click(function () {
        if (localStorage.getItem("loginStatus") != "cliente") {
          alert("Você precisa estar logado para concluir a reserva!");
          return true;
        }
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
      window.$("#btnMinhasReservas").click(function () {
        if (localStorage.getItem("loged") === null) {
          return true;
        }
        window.$("#modalMinhasReservas").modal("show");
      });
    });

    // window.$().ready(function () {
    //   window.$("#btnConfirma").click(function () {
    //     window.$("#modalConfirma").modal("show");
    //   });
    // });
    // confirmação da reserva e display da modal de confirmação

    window.$().ready(function () {
      window.$("#btnConfirma").click(function () {
        let check = false;
        // executa function para checar dados da reserva...
        check = confirmaReserva();
        if (check) {
          window.$("#modalResumo").modal("show");
          preencheModalResumo();
        }
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

  // checar qtdade maxima de pessoas...qtMaxPessoas
  const qtMaxPessoas = parseInt(localStorage.getItem("qtMaxPessoas"));

  if (qtPessoas == 0) {
    msgReturn = [false, "Quantidade de pessoas inválida"];
  } else { if (qtPessoas > qtMaxPessoas) {
      msgReturn = [false, "Quantidade de pessoas maior que a capacidade da acomodação"];
    }
  }
  
  console.log("Tipo apto...",qtPessoas,qtMaxPessoas,((qtPessoas === 0) || (qtPessoas > qtMaxPessoas)),msgReturn);

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
    qtMaxPessoas,
    valorTotalDiarias,
    msgRetorno;

  // define dados dos quartos... REVER - TEM QUE VIR DO BANCO!!!!
  const dadosQuartos = [
    { tipo: "master", diaria: 600, ocupacao: 4 },
    { tipo: "family", diaria: 400, ocupacao: 6 },
    { tipo: "comfort", diaria: 200, ocupacao: 2 },
  ];

  // obter dados do array de aptos...REVER - TEM QUE VIR DO BANCO!!!!
  qtMaxPessoas = 0;
  vlrDiaria = 0;
  dadosQuartos.some(function (entry) {
    if (entry.tipo == localStorage.getItem("tipoApto")) {
      qtMaxPessoas = entry.ocupacao;
      vlrDiaria = entry.diaria;
    }
  });
  
  localStorage.setItem("valorDiaria", vlrDiaria);
  localStorage.setItem("qtMaxPessoas", qtMaxPessoas);

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

  //obter vlrDiaria do array de aptos...REVER - TEM QUE VIR DO BANCO!!!!
  // dadosQuartos.some(function (entry) {
  //   if (entry.tipo == localStorage.getItem("tipoApto")) {
  //     vlrDiaria = entry.diaria;
  //   }
  // });
  // localStorage.setItem("valorDiaria", vlrDiaria);

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
      taxaDescontoCupom: `${taxaDescontoCupom}`,
    },
  ];
  localStorage.setItem(`Reserva_${novoId}`, JSON.stringify(ReservaAux));

  limpaLocalStorage();

  return true;
}

export function limpaLocalStorage() {
  // força geração cupom...
  cupomDesconto();

  // zera servicos...
  localStorage.setItem("dtEntrada", "");
  localStorage.setItem("dtSaida", "");
  localStorage.setItem("qtPessoas", "");
  localStorage.setItem("difDates", "");
  localStorage.setItem("tipoApto", "");
  localStorage.setItem("dtReserva", "");
  localStorage.setItem("valorTotalGeral", "");
  localStorage.setItem("vlrTotalDesconto", "");
  // localStorage.setItem("cupomDesconto", "");
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
  const divDiarias = document.getElementById("diarias");
  const divTotal = document.getElementById("total");
  const divTotalDesconto = document.getElementById("totalDesconto");

  let servicosEscolhidos = "";
  if (localStorage.getItem("servicosEscolhidos") != null) {
    //let arrayServicosEscolhidos = JSON.parse(localStorage.getItem("servicosEscolhidos"));
    let arrayServicosEscolhidos = localStorage.getItem("servicosEscolhidos");
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

  // limpa div para eliminar seleções anteriores...
  while (divTotalDesconto.hasChildNodes()) {
    divTotalDesconto.removeChild(divTotalDesconto.firstChild);
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
  if (servicosEscolhidos !== "") {
    for (let i = 0; i < servicosEscolhidos.length; i++) {
      if (servicosEscolhidos[i].isSelected === "true") {
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
    }
    localStorage.setItem("valorTotalServicos", vlrSomaServicos);
  } else {
    paraTexto = "<br />";
    document
      .getElementById("servicos")
      .appendChild(createPara("Sem serviços adicionais"));
    localStorage.setItem("valorTotalServicos", 0);
  }

  let valorTotalGeral =
    vlrSomaServicos + parseFloat(localStorage.getItem("valorTotalDiarias"));

  // grava valor geral
  localStorage.setItem("valorTotalGeral", valorTotalGeral);
  // repete valor geral para total com desconto, será utilizado em outra função...
  localStorage.setItem("vlrTotalDesconto", valorTotalGeral);

  // atualiza div total
  paraTexto =
    "Total diarias: " +
    currencyFormat(localStorage.getItem("valorTotalDiarias")) +
    "<br />";
  document.getElementById("total").appendChild(createPara(paraTexto));

  paraTexto =
    "Total servicos: " +
    currencyFormat(localStorage.getItem("valorTotalServicos")) +
    "<br />";
  document.getElementById("total").appendChild(createPara(paraTexto));

  paraTexto =
    "Total geral: " +
    currencyFormat(localStorage.getItem("valorTotalGeral")) +
    "<br />";
  document.getElementById("total").appendChild(createPara(paraTexto));

  return true;
}

export function createPara(conteudo) {
  var para = document.createElement("p");
  para.style.cssText =
    "font-size:15px; color:black, line-height: 10px; margin-bottom: 10px;";
  para.innerHTML = conteudo;
  return para;
}

export function cupomDesconto() {
  // verifica se cupom ainda pode ser gerado, persistena na localStorage
  let msgCupomDesconto = "Sem desconto";
  let dtCupomDesconto = new Date().toISOString().substring(0, 10);
  if (localStorage.getItem("cupomDescontoValido") != "NOK") {
    let cupom = Math.random().toString(36).substring(2, 9);
    msgCupomDesconto = cupom;
  }
  localStorage.setItem("cupomDesconto", msgCupomDesconto);
  localStorage.setItem("dtCupomDesconto", dtCupomDesconto);
  return true;
}

// export function aplicaDesconto() {
//
// }
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

.flex > div {
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
  font-size: 1em;
  margin-top: 10px;
}

.flex > div > button {
  margin-right: 10px;
}

.flex > div > label {
  margin-right: 10px;
}

.flex > div > input {
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

.minhaReserva {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.form-control {
  font-size: 1.2em;
}
</style>
