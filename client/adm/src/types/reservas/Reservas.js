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
    // inputIdAcomodacaoTipo,
    inputIdAcomodacao,
    itemArrayReservas,
    itemArrayEdit
  ) {
    this.idReservas = idReservas;
    this.dataReserva = inputDataReserva;
    this.dataEntradaReserva = inputDataEntradaReserva;
    this.dataSaidaReserva = inputDataSaidaReserva;
    this.valorReserva = inputValorReserva;
    this.qtdHospedesReserva = inputQtdHospedesReserva;
    this.idUsuario = inputIdUsuario;
    // this.idAcomodacaoTipo = inputIdAcomodacaoTipo;
    this.idAcomodacao = inputIdAcomodacao;
    this.itemArrayReservas = itemArrayReservas;
    this.itemArrayEdit = itemArrayEdit;

    // this.lerReserva();
    console.log(
      "Vou salvar...",
      this.idReservas,
      this.dataReserva,
      this.dataEntradaReserva,
      this.dataSaidaReserva,
      this.qtdHospedesReserva
    );

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
        this.idAcomodacaoTipo,
        this.idAcomodacao,
        this.idCupom
      );
      //   this.updateServicoBD();
      //   this.getReservas();
      this.itemArrayEdit = false;
      return true;
    }

    // grava dados do servico
    this.criaReservaBD();
    // atualiza listagem de itens...
    this.listaReservas("idReservas");
    this.getReservas();
    return true;
  }

  excluir(idServico) {
    this.excluirServicoBD(idServico);
    this.getReservas();
    // força erro para recarregar o grid...verificar motivo!!!
    // this.excluirServicoBD("null");
    // this.getReservas();
    return true;
  }

  async criaReservaBD() {
    console.log("entrei na gravação do registro...");
    try {
      await axios.post("http://localhost:5000/reserva", {
        dataReserva: this.dataReserva,
        dataEntradaReserva: this.dataEntradaReserva,
        dataSaidaReserva: this.dataSaidaReserva,
        valorReserva: this.valorReserva,
        qtdHospedesReserva: this.qtdHospedesReserva,
        usuario_idUsuario: this.idUsuario,
        acomodacoes_idAcomodacao: this.idAcomodacao,
      });
    } catch (err) {
      console.log(err);
    }
    return true;
  }

  async updateServicoBD() {
    console.log("entrei no update da reserva...");
    try {
      await axios.put(`http://localhost:5000/reserva/${this.idReserva}`, {
        dataReserva: this.dataReserva,
        dataEntradaReserva: this.dataEntradaReserva,
        dataSaidaReserva: this.dataSaidaReserva,
        valorReserva: this.valorReserva,
        qtdHospedesReserva: this.qtdHospedesReserva,
        idUsuario: this.idUsuario,
        idAcomodacao: this.idAcomodacao,
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

  async excluirServicoBD(idServico) {
    console.log("excluirServicoBD", idServico);
    try {
      await axios.delete(`http://localhost:5000/servico/${idServico}`, {
        nomeServico: this.nome,
        vlrDiariaServico: this.vlrDiaria,
        descricaoServico: this.descricao,
        labelServico: this.label,
      });
      this.nome = "";
      this.vlrDiaria = "";
      this.descricao = "";
      this.label = "";
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

  excluirServico(idArray) {
    let arrayStorage = [];
    if (localStorage.getItem("servicoAdm")) {
      arrayStorage = JSON.parse(localStorage.getItem("servicoAdm"));
    }
    arrayStorage.splice(idArray, 1);
    // atualiza localStorage...
    localStorage.setItem("servicoAdm", JSON.stringify(arrayStorage));

    return true;
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
    // servicos = [
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
    // ];
    // console.log("servicos do listaReservas", servicos);
    // return servicos;
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
