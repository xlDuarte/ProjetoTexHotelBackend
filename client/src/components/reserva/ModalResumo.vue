<template>
  <!-- Inicio Modal Resummo -->
  <div class="modal fade" id="modalResumo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- INÍCIO DO CONTEÚDO -->
          <!-- inicio div Resumo -->
          <div id="bodyResumo">
            <h3>Veja o resumo de sua solicitação!</h3>
            <hr />
            <h2>Diárias</h2>
            <div id="diarias"></div>
            <hr />
            <h2>Servicos Adicionais</h2>
            <div id="servicos"></div>
            <hr />
            <h2>Total</h2>
            <div id="total"></div>
            <hr />
          </div>
          <!-- Fim body Resumo-->
          <!-- Inicio body confirma-->
          <div id="bodyConfirma">
            <h3>Confirme sua reserva</h3>
            <h2>Seu cupom de desconto: {{ cupomDescontoResumo }}</h2>
            <div class="mt-2 pt-2 d-flex flex-start">
              <label for="">Aplicar Cupom de Desconto: </label>
              <input
                id="inputDesconto"
                class="w-50 inputPadrao bg-light px-3 text-uppercase fw-bold"
                type="text"
                v-model="cupomDescontoResumo"
              />
              <button id="btnCupom" type="button" class="btn btn-secondary">
                Aplicar Cupom
              </button>

              <button class="btn btn-secondary" @click="confirmaReserva">
                Confirma Reserva
              </button>
              <!-- <button
                id="btnConfReserva"
                type="button"
                class="btn btn-secondary"
              >
                Confirma Reserva
              </button> -->
            </div>
            <hr />
            <div id="totalDesconto">
              <p id="totalDesconto"></p>
            </div>
          </div>
        </div>
        <!-- fim body confirma -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Fechar
        </button>
        <!-- <button type="button" id="btnConfirma" class="btn btn-secondary">
          Confirma!
        </button> -->
        <!-- <a data-dismiss="modal" data-toggle="modal" href="#modalConfirma"
          >Click</a
        > -->
      </div>
      <!-- fim modal -->
    </div>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
const bootstrap = require("bootstrap");

import { ref } from "vue";
import { cupomDesconto } from "./FormReserva.vue";
import { gravaReserva } from "./FormReserva.vue";
import { currencyFormat } from "./FormReserva.vue";
import { updateBindingForm } from "./FormReserva.vue";
import { Reservas } from "@/../adm/src/types/reservas/Reservas.js";
import { mapState } from "vuex";


import moment from "moment";

import jsPDF from 'jspdf';

import logo from '@/assets/images/footer/logo_hotel.png'



// gera cupom de desconto caso não exista nenhum. Se já houver a mensagem é que não podem ser gerados dois cupons no mesmo dia...
cupomDesconto();

var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

export default {
  name: "ModalResumo",
  props: {
    // properties que vem da view que irá chamar o componente...
    msg: String,
  },
  data() {
    return {
      // informações que podem ser utilizadas no template...
      // cupomDesconto: localStorage.getItem("cupomDesconto"),
      cupomDescontoResumo: localStorage.getItem("cupomDesconto"),
      totalGeralDesconto: localStorage.getItem("vlrTotalDesconto"),
    };
  },
  methods: {
    abreModal() {
      var modal = new bootstrap.Modal(document.querySelector("#modalResumo"), {
        keyboard: false,
      });
      return modal;
    },
    confirmaReserva() {
      if (
        localStorage.getItem("valorTotalGeral") !==
        localStorage.getItem("vlrTotalDesconto")
      ) {
        localStorage.setItem("cupomDescontoValido", "NOK");
      }

      gravaReserva();

      let reserva = new Reservas();

      // console.log(reserva.getReservasById("36"));
      //obtem dados da reserva feita pelo hospede da localStorage
      let reservaCriada = `Reserva_${localStorage.getItem("reservaId")}`;
      let arrayReservaCriada = JSON.parse(localStorage.getItem(reservaCriada));

      // console.log("Reserva criada array...", arrayReservaCriada);
      // console.log("Reserva criada array...", arrayReservaCriada[0].reservaId);
      // console.log("Reserva criada array...", arrayReservaCriada[0].diarias);

      /*
      Você deve informar para o moment o formato de entrada, ou seja, como está a string com sua data antes de formatá-la pois internamente ele
      fará um parse e chamará um new Date(). 
      Fonte: http://momentjs.com/docs/#/parsing/string/
      var data = moment("02/03/2018", "DD/MM/YYYY");
      //Feito isso basta definir o formato de saída:
      console.log(data.format("YYYY-MM-DD"));
      */

      let idReservas = "";
      let dtReserva = moment(
        arrayReservaCriada[0].dtReserva,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      let dtEntrada = moment(
        arrayReservaCriada[0].dtEntrada,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      let dtSaida = moment(arrayReservaCriada[0].dtSaida, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      let vlrTotal = arrayReservaCriada[0].vlrTotal;
      let qtPessoas = arrayReservaCriada[0].qtPessoas;
      let idUsuario = arrayReservaCriada[0].idUsuario;
      let idAcomodacao = "3"; // falta incluir na ls - arrayReservaCriada[0].idAcomodacao;
      let acomodacaoVlrDiaria = 200; // falta inclir na LS - arrayReservaCriada[0].acomodacaoVlrDiaria;
      let tipoApto = arrayReservaCriada[0].tipoApto;
      let diarias = arrayReservaCriada[0].diarias;
      let statusReserva = "Registrada";
      let dataCancelamento = null;
      let motivoCancelamento = "";
      let cupom = arrayReservaCriada[0].cupom;
      let taxaDescontoCupom = arrayReservaCriada[0].taxaDescontoCupom;
      let valorTotalServicos = localStorage.getItem("valorTotalServicos");
      let vlrTotalcomDesconto = arrayReservaCriada[0].vlrTotalcomDesconto;
      let itemArrayReservas = 0; // avaliar, não está mais sendo utilizado...
      let itemArrayEdit = false; //flag de controle se false é uma nova reserva...

      reserva.salvar(
        idReservas,
        dtReserva,
        dtEntrada,
        dtSaida,
        vlrTotal,
        qtPessoas,
        idUsuario,
        idAcomodacao,
        tipoApto,
        acomodacaoVlrDiaria,
        diarias,
        statusReserva,
        dataCancelamento,
        motivoCancelamento,
        cupom,
        taxaDescontoCupom,
        valorTotalServicos,
        vlrTotalcomDesconto,
        itemArrayReservas,
        itemArrayEdit
      );

      let geraPDF = confirm("Quer gerar um PDF de sua reserva?");
      if (geraPDF) {
        var blob = this.gerarPDF();
        var url = URL.createObjectURL(blob);
        window.open(url);
      }

      alert(
        "Sua reserva foi confirmada - você irá receber um email com a confirmação! Obrigado!"
      );

      // verificar como limpar o selected de serviços para não vir flagado na próxima reserva!!!!
      for (var i = 0; i < localStorage.length; i++) {
        // console.log(
        //   "Valor item localStorage...",
        //   localStorage.getItem(localStorage.key(i))
        // );
        console.log("Item localStorage...", localStorage.key(i));
        if (localStorage.key(i).includes("idServicos")) {
          localStorage.removeItem(localStorage.key(i));
        }
      }

      // limpeza dos componentes após confirmação...
      // limpa selected dos serviços...
      let arrayServicos = this.Servicos2;
      for (let i = 0; i < arrayServicos.data.length; i++) {
          console.log("Servicos ",arrayServicos.data[i].nomeServico, arrayServicos.data[i].isSelected);
          arrayServicos.data[i].isSelected = false;
      }
      // atualiza campo cupom da modal...
      this.cupomDescontoResumo = ref(localStorage.getItem("cupomDesconto"));

      updateBindingForm();
      window.$("#modalResumo").modal("hide");
    },
    gerarPDF() {
      const reserva = JSON.parse(localStorage.getItem(`Reserva_${localStorage.getItem("reservaId")}`));
      var doc = new jsPDF();
      const imgProps = doc.getImageProperties(logo);

      
      //trabalhando com a imagem
      const imgWidth = 25
      const imgHeight = (imgProps.height * imgWidth)/imgProps.width

      const pageWidth = doc.internal.pageSize.getWidth(); // largura da página
     // const pageHeight = doc.internal.pageSize.getHeight(); // altura da página
      const xPos = (pageWidth - imgWidth) / 2; // posição x centralizada
      //const yPos = (pageHeight - imgHeight) / 2; // posição y centralizada

      //function para gerar a listagem
      function addListBullet(doc, text, x, y) {
        const fontSize = 12;
        //const lineHeight = doc.getLineHeight();
        const bulletRadius = 0.6;

        // Define a posição da bolinha para ficar verticalmente centralizada em relação ao texto
        const bulletX = x + bulletRadius;
        const bulletY = y-1.5 ;

        // Desenha a bolinha
        doc.setFillColor(0, 0, 0);
        doc.circle(bulletX, bulletY, bulletRadius, 'F');

        // Adiciona o texto da lista
        const textX = bulletX + bulletRadius * 2;
        const textY = y;
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(0,0,0)
        doc.text(text, textX, textY);

        // Desenha um sublinhado abaixo do texto
        const lineWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
        const lineX = textX;
        const lineY = textY + 1; // adiciona uma pequena margem abaixo do texto
        doc.line(lineX, lineY, lineX + lineWidth, lineY);
      }




      // Define o título do documento
      doc.setProperties({
        title: 'Resumo de Reserva - Hotel Casa na Praia'
      });

      // Define a fonte e tamanho do título
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);

      // Adiciona a logo e título ao documento
      doc.addImage(logo,'PNG', xPos, 0, imgWidth, imgHeight)
      doc.text('RESUMO DE RESERVA - HOTEL CASA NA PRAIA', 105, 35, null, null, 'center')

      // Define a fonte e tamanho do subtitulo
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);

      // Adiciona o nome do hotel como subtitulo
      doc.text(`Titular da Reserva: ${reserva[0].codCliente}`, 105, 45, null, null, 'center');


      // Define a posição do primeiro campo
      var x = 30;
      var y = 60;

      // Adiciona os campos de dados da reserva
      
      addListBullet(doc, "PERÍODO:", 25, 60)
      y += 10;

      // Define a fonte e tamanho do corpo do documento
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);

      doc.text(`Data de entrada: ${reserva[0].dtEntrada}`,x, y)

      y += 10;

      doc.text(`Data de Saída: ${reserva[0].dtSaida}`,x,y)

      y += 10;
      
      addListBullet(doc, "QUANTIDADE DE PESSOAS:", 25, y)
      // Define a fonte e tamanho do corpo do documento
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(`${reserva[0].qtPessoas}`,86,y)
      y+=10

      addListBullet(doc, "OPÇÃO DE ACOMODAÇÃO:", 25, y)
      // Define a fonte e tamanho do corpo do documento
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(`${reserva[0].tipoApto}`,85,y)
      y+=10

      addListBullet(doc, "VALOR TOTAL:", 25, y)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor('#B22222'); 
      doc.text(`R$${reserva[0].vlrTotalcomDesconto},00`,59,y)

      y+=10

      addListBullet(doc, "SATUS DO PAGAMENTO:", 25, y)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor('#00FF00'); 
      doc.text(`R$${reserva[0].vlrTotalcomDesconto},00(CONFIRMADO)`,80,y)


      y=250
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(0,0,0)
      doc.text(`Agradecemos a preferência!`,140,y,)
      y+=5
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(`Grupo 3`,182,y,)
      y+=5
      doc.text(`Recepção & Reserva`,157,y,)
      y+=20

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`AV. XXXXXX-XXXXXX`,105,y, {align:"center"})
      y+=5
      doc.text(`Whatsapp: `,95,y, {align:"center"})
      doc.setTextColor(24,77,117); 
      doc.textWithLink('XXXX-XXXX', 104, y, {url: 'https://chat.whatsapp.com/KthRdCQBgphIxusvtrUFs7'}, {align: "center"});
      y+=5
      doc.setTextColor(0,0,0)
      doc.text(`CNPJ: 74.656.453/0001-07`,105,y, {align:"center"})


      //fundamental e inalterável
      return doc.output("blob");
          },
    
  },
  computed: {
    ...mapState(["Servicos2"]),    

  },
  mounted() {
    // atualiza dados da modalResumo
    // preencheModalResumo();
    this.cupomDescontoResumo = ref(localStorage.getItem("cupomDesconto"));
  },
};

window.$().ready(function () {
  // confirmação da reserva...
  window.$("#btnConfReserva").click(function () {
    console.log("Cliquei na confirmação...");
    console.log("Teste...");
    // verifica se desconto foi utilizado, para mudar flag de aplicar desconto...
    if (
      localStorage.getItem("vlrTotalGeral") !=
      localStorage.getItem("vlrTotalDesconto")
    ) {
      localStorage.setItem("cupomDescontoValido", "NOK");
    } else {
      localStorage.setItem("cupomDescontoValido", "OK");
    }
  });

  // aplica cupom...
  window.$("#btnCupom").click(function () {
    let cupomEntry = document
      .querySelector("#inputDesconto")
      .value.toLowerCase();
    let cupomStorage = localStorage.getItem("cupomDesconto");
    let vlrTotalGeral = localStorage.getItem("valorTotalGeral");
    let percDesc = 1;
    let msg = "Total Reserva....: "; //${localStorage.getItem("valorTotalGeral")}`;

    if (localStorage.getItem("cupomDescontoValido") == "OK") {
      // tem direito a usar o cupom...
      if (cupomEntry == cupomStorage) {
        percDesc = 0.9;
        msg = "Total Reserva com desconto....: ";
      } else {
        alert("Cupom inválido");
        document.getElementById("inputDesconto").value = "";
      }
    } else {
      // não pode mais usar o cupom...
      alert(
        "Lamentamos, sem cupom de desconto no momento, ou cupom não é mais válido..."
      );
    }

    // let desconto = parseFloat(vlrTotalGeral[1].replace(".", "")) * percDesc;
    console.log("Calculando desconto ou total sem desconto...", msg, percDesc);
    let desconto = vlrTotalGeral * percDesc;
    console.log("VlrTotalDesconto", desconto);
    localStorage.setItem("vlrTotalDesconto", desconto.toFixed(2));
    let msg2 = `${msg} ${currencyFormat(desconto)}`;
    document.getElementById("totalDesconto").innerText = msg2;
  });
});
</script>

<style scoped>
* {
  color: black;
}

h3 {
  font-size: 20px;
  margin: 20px 0 0;
  color: red;
}

h2 {
  font-size: 15px;
  margin: 20px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #2304ed;
}

p {
  color: brown;
  line-height: 10px;
  /* within paragraph */
  margin-bottom: 10px;
  /* between paragraphs */
  font-size: 15px;
}
</style>
