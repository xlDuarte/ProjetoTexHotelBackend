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
    vlrDiariaAcomodacao,
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
    this.vlrDiariaAcomodacao = vlrDiariaAcomodacao;
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

    console.log(
      "Controle de validação e edição:",
      `Validação:${this.validacao} - Edição:${this.itemArrayReservas} - ${this.itemArrayEdit} `
    );
    if (this.validacao !== true) {
      alert("Informações da reserva não estão ok! Verificar!");
      return false;
    }

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
      this.updateReservaBD();
      //   this.getReservas();
      this.itemArrayEdit = false;
      this.getReservas();
      return true;
    }

    // grava dados do servico
    this.criaReservaBD();
    // atualiza listagem de itens...
    this.listaReservas("idReservas");
    this.getReservas();
    return true;
  }

  excluir(idReservas) {
    console.log("Rotina excluir()...", idReservas);
    this.excluirReservaBD(idReservas);
    this.getReservas();
    return true;
  }

  async criaReservaBD() {
    console.log(
      "entrei na gravação do registro...",
      this.dataReserva,
      this.qtDiarias
    );
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
    // console.log(
    //   "entrei no update da reserva...",
    //   this.idReservas,
    //   this.qtdHospedesReserva,
    //   this.idUsuario,
    //   this.idAcomodacao,
    //   this.motivoCancelamento
    // );
    try {
      await axios.put(`http://localhost:5000/reserva/${this.idReservas}`, {
        dataReserva: this.dataReserva,
        dataEntradaReserva: this.dataEntradaReserva,
        dataSaidaReserva: this.dataSaidaReserva,
        valorReserva: this.valorReserva,
        qtdHospedesReserva: this.qtdHospedesReserva,
        idUsuario: this.idUsuario,
        idAcomodacao: this.idAcomodacao,
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
      // this.nome = "";
      // this.vlrDiaria = "";
      // this.descricao = "";
      // this.label = "";
    } catch (err) {
      console.log(err);
    }
    //this.getReservas();
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

  async listaReservas(ordem) {
    // define conteudo do array de servicos...
    let servicos = [];
    console.log("listaReservas", ordem);
    try {
      const response = await axios.get("http://localhost:5000/servico");
      this.items = response.data;
      servicos = response.data;
      console.log("servicos do listaReservas", servicos);
      return servicos;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  getReservas = async () => {
    try {
      const response = await fetch("http://localhost:5000/servico");
      const data = await response.json();
      console.log("getReservas", data);
      return data;
    } catch (error) {
      console.log("Error getting data", error);
      return Promise.reject(error);
    }
  };

  sortReservas(prop) {
    //Comparer Function
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }
}
