/* Reservas.js */
// classe Reservas
// para checar na edição...
// > ["a","b","c"].forEach(letra => { letra === "a" ? console.log("Letra",letra) : console.log("erro")})

console.log("Executando Reservas.js");

export const msg = "Teste, Reservas.js";

// import axios
import axios from "axios";

export class Reservas {
  idReservas;
  dataReserva;
  dataEntradaReserva;
  dataSaidaReserva;
  valorReserva;
  qtdHospedesReserva;
  idUsuario;
  idAcomodacaoTipo;
  idAcomodacao;
  acomodacaoTipo;
  acomodacaoVlrDiaria;
  vlrDiariaAcomodacao;
  qtDiarias;
  statusReserva;
  dataCancelamento;
  motivoCancelamento;
  cupom;
  taxaDescontoCupom;
  valorTotalDesconto;
  valorTotalServicos;
  idCupom;
  storage = [];

  constructor(id) {
    !id ? (this.id = 0) : (this.id = id);
  }
  salvar(
    idReservas,
    inputDataReserva,
    inputDataEntradaReserva,
    inputDataSaidaReserva,
    inputValorReserva,
    inputQtdHospedesReserva,
    inputIdUsuario,
    inputIdAcomodacao,
    acomodacaoTipo,
    acomodacaoVlrDiaria,
    qtDiarias,
    statusReserva,
    dataCancelamento,
    motivoCancelamento,
    cupom,
    taxaDescontoCupom,
    valorTotalDesconto,
    valorTotalServicos,
    itemArrayReservas,
    itemArrayEdit
  ) {
    // campos input - form
    this.idReservas = idReservas;
    this.dataReserva = inputDataReserva;
    this.dataEntradaReserva = inputDataEntradaReserva;
    this.dataSaidaReserva = inputDataSaidaReserva;
    this.valorReserva = inputValorReserva;
    this.qtdHospedesReserva = inputQtdHospedesReserva;
    this.idUsuario = inputIdUsuario;
    this.idAcomodacao = inputIdAcomodacao;
    // campos não input
    this.acomodacaoTipo = acomodacaoTipo;
    this.acomodacaoVlrDiaria = acomodacaoVlrDiaria;
    this.qtDiarias = qtDiarias;
    this.statusReserva = statusReserva;
    this.dataCancelamento = dataCancelamento;
    this.motivoCancelamento = motivoCancelamento;
    this.cupom = cupom;
    this.taxaDescontoCupom = taxaDescontoCupom;
    this.valorTotalDesconto = valorTotalDesconto;
    this.valorTotalServicos = valorTotalServicos;
    this.itemArrayReservas = itemArrayReservas;
    this.itemArrayEdit = itemArrayEdit;

    this.validacao = this.validarCampos(
      inputDataEntradaReserva,
      inputDataSaidaReserva,
      inputQtdHospedesReserva
    );

    // console.log(
    //   "Controle de validação e edição:",
    //   `Validação:${this.validacao} - Edição:${this.itemArrayReservas} - ${this.itemArrayEdit}`
    // );
    if (this.validacao !== true) {
      alert("Informações da reserva não estão ok! Verificar!");
      return false;
    }

    // verifica campos calculados - valorReserva, qtdade diarias, etc
    // rotina para tratar as datas de input
    let dateStartAux, dateEndAux, dateStart, dateEnd, difDates;
    dateStartAux = this.dataEntradaReserva.split("-");
    dateStart = new Date(dateStartAux[0], dateStartAux[1] - 1, dateStartAux[2]);
    dateEndAux = this.dataSaidaReserva.split("-");
    dateEnd = new Date(dateEndAux[0], dateEndAux[1] - 1, dateEndAux[2]);
    difDates = Math.ceil(dateEnd - dateStart) / (1000 * 60 * 60 * 24);

    // calcula valor da reserva, sem servicos
    this.valorReserva =
      parseFloat(difDates) *
      parseFloat(this.qtdHospedesReserva) *
      parseFloat(this.acomodacaoVlrDiaria);
    // console.log(
    //   `Valor reserva: ${this.valorReserva} - ${difDates} - ${this.qtdHospedesReserva} - ${this.acomodacaoVlrDiaria}`
    // );

    // verifica se é uma edição, o tratamento é diferente...
    if (this.itemArrayEdit) {
      console.log(
         "Dados alterados:",
         idReservas,
         this.dataReserva,
         this.dataEntradaReserva,
         this.dataSaidaReserva,
         this.valorReserva,
         this.qtdHospedesReserva,
         this.idUsuario,
         this.idAcomodacao,
         this.statusReserva,
         this.dataCancelamento,
         this.motivoCancelamento
      );

      // solicita confirmação em caso de cancelamento...
      let confirmaSalvar = true;
      if (this.statusReserva === "Cancelada") {
        confirmaSalvar = confirm(
          "Confirma cancelamento da reserva? Esta operação não poderá ser desfeita!"
        );
      }

      if (confirmaSalvar) {
        // grava dados da reserva editada...
        this.updateReservaBD();
      }
      this.itemArrayEdit = false;
      //this.getReservas();
      return true;
    }

    // grava dados da nova reserva...
    this.criaReservaBD();
    return true;
  }

  excluir(idReservas) {
    console.log("Rotina excluir()...", idReservas);
    this.excluirReservaBD(idReservas);
    return true;
  }

  async criaReservaBD() {
    try {
      await axios.post("http://localhost:5000/reserva", {
        dataReserva: this.dataReserva,
        dataEntradaReserva: this.dataEntradaReserva,
        dataSaidaReserva: this.dataSaidaReserva,
        valorReserva: this.valorReserva,
        qtdHospedesReserva: this.qtdHospedesReserva,
        usuario_idUsuario: this.idUsuario,
        acomodacoes_idAcomodacao: this.idAcomodacao,
        qtDiarias: this.qtDiarias,
        acomodacaoTipo: this.acomodacaoTipo,
        acomodacaoVlrDiaria: this.acomodacaoVlrDiaria,
        statusReserva: this.statusReserva,
        motivoCancelamento: this.motivoCancelamento,
        dataCancelamento: this.dataCancelamento,
        cupom: this.cupom,
        taxaDescontoCupom: this.taxaDescontoCupom,
        valorTotalDesconto: this.valorTotalDesconto,
        valorTotalServicos: this.valorTotalServicos,
      });
    } catch (err) {
      console.log(err);
    }
    return true;
  }

  async updateReservaBD() {
    if (this.statusReserva === "Cancelada") {
      this.dataCancelamento = new Date().toISOString().substring(0, 10);
    }
    try {
      await axios.put(`http://localhost:5000/reserva/${this.idReservas}`, {
        dataReserva: this.dataReserva,
        dataEntradaReserva: this.dataEntradaReserva,
        dataSaidaReserva: this.dataSaidaReserva,
        valorReserva: this.valorReserva,
        qtdHospedesReserva: this.qtdHospedesReserva,
        idUsuario: this.idUsuario,
        idAcomodacao: this.idAcomodacao,
        acomodacaoTipo: this.acomodacaoTipo,
        acomodacaoVlrDiaria: this.acomodacaoVlrDiaria,
        statusReserva: this.statusReserva,
        dataCancelamento: this.dataCancelamento,
        motivoCancelamento: this.motivoCancelamento,
      });
      this.dataReserva = "";
      this.dataEntradaReserva = "";
      this.dataSaidaReserva = "";
      this.valorReserva = "";
      this.qtdHospedesReserva = "";
      this.idUsuario = "";
      this.idAcomodacao = "";
    } catch (err) {
      console.log(err);
    }
    return true;
  }

  async excluirReservaBD(idReservas) {
    console.log("excluirReservaBD", idReservas);
    try {
      await axios.delete(`http://localhost:5000/reserva/${idReservas}`, {});
    } catch (err) {
      console.log(err);
    }
    return true;
  }

  lerServico() {
    let servico = {};
    servico.id = this.id;
    servico.nome = this.nome;
    servico.label = this.label;
    servico.descricao = this.descricao;
    servico.vlrDiaria = this.vlrDiaria;
    return servico;
  }

  validarCampos(
    inputDataEntradaReserva,
    inputDataSaidaReserva,
    inputQtdHospedesReserva
  ) {
    console.log(
      "to validando",
      inputDataEntradaReserva,
      inputDataSaidaReserva,
      inputQtdHospedesReserva
    );
    return inputDataEntradaReserva.length < 1 ||
      inputDataSaidaReserva.length < 1 ||
      inputQtdHospedesReserva.length < 1
      ? false
      : true;
  }

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
  }
}
