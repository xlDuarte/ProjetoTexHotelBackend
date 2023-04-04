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
  idUltimaReserva;
  Servicos2;
  arrayServicosSelecionados;
  storage = [];

  constructor(id) {
    !id ? (this.id = 0) : (this.id = id);
  }

  // inicio rotina para persistir reserva no BD...
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
    itemArrayEdit,
    arrayServicosEscolhidos
  ) {
    console.log("Calculos3...:", idReservas,inputDataReserva,inputQtdHospedesReserva,inputIdUsuario,inputIdAcomodacao);

    // dataReserva,dataEntradaReserva,dataSaidaReserva,valorReserva,qtdHospedesReserva,idUsuario,
    //       this.idAcomodacao,
    //       this.acomodacaoTipo,
    //       this.acomodacaoVlrDiaria,
    //       this.qtDiarias,
    //       this.statusReserva,
    //       this.dataCancelamento,
    //       this.motivoCancelamento,
    //       this.cupom,
    //       this.taxaDescontoCupom,
    //       this.valorTotalDesconto,
    //       this.valorTotalServicos,
    //       this.itemArrayReservas,
    //       this.itemArrayEdit
    //     );

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
    this.arrayServicosEscolhidos = arrayServicosEscolhidos;
    this.servicosEscolhidos = localStorage.getItem("servicosEscolhidos");
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
    let dateStartAux, dateEndAux, dateStart, dateEnd;
    dateStartAux = this.dataEntradaReserva.split("-");
    dateStart = new Date(dateStartAux[0], dateStartAux[1] - 1, dateStartAux[2]);
    dateEndAux = this.dataSaidaReserva.split("-");
    dateEnd = new Date(dateEndAux[0], dateEndAux[1] - 1, dateEndAux[2]);
    this.qtDiarias = Math.ceil(dateEnd - dateStart) / (1000 * 60 * 60 * 24);

    // calcula valor da reserva, sem servicos
    this.valorReserva =
      parseFloat(this.qtDiarias) *
      parseFloat(this.qtdHospedesReserva) *
      parseFloat(this.acomodacaoVlrDiaria);

    console.log ("Calculos2...:",this.qtDiarias, this.valorReserva,this.idUsuario)

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

    return this.criaReservaBD();
  }
  // fim rotina persistencia reserva no BD...

  salvarServicos(idUltimaReserva, arrayServicosSelecionados) {
    let arrayServ = [];
    console.log(
      "Dados recebidos...",
      idUltimaReserva,
      arrayServicosSelecionados,
      localStorage.getItem("servicosEscolhidos")
    );

    // verifica se existem serviços para salvar...
    if (localStorage.getItem("servicosEscolhidos") !== null) {
      arrayServ = JSON.parse(localStorage.getItem("servicosEscolhidos"));

      // verifica serviços selecionados e persiste no BD...
      console.log("Ultima reserva...", idUltimaReserva);
      console.log("Servicos arrayServ...", arrayServ);

      for (let i = 0; i < arrayServ.length; i++) {
        console.log("verifica serviços selecionados");
        // antes só grava os selecionados..ajustado para gravar todos...

        let isSelected = "false";
        if (arrayServ[i].isSelected) {
          isSelected = "true";
        }

        let Reservas_idReservas = idUltimaReserva;
        let servicos_idservicos = arrayServ[i].idServicos;
        let nomeServico = arrayServ[i].nomeServico;
        let descricaoServico = arrayServ[i].descricaoServico;
        let vlrDiariaServico = arrayServ[i].vlrDiariaServico;

        this.criaServicoReservaBD(
          Reservas_idReservas,
          servicos_idservicos,
          nomeServico,
          vlrDiariaServico,
          descricaoServico,
          isSelected
        );
      }
      localStorage.removeItem("servicosEscolhidos");
    }
  }

  excluir(idReservas) {
    console.log("Rotina excluir()...", idReservas);
    this.excluirReservaBD(idReservas);
    return true;
  }

  //   try {
  //     const response = await axios.get(urlYandex);

  //     return response.data.text[0];
  // } catch(error) {
  //     return error;
  // }

  async criaReservaBD() {
    let response = "";
    try {
      response = await axios.post("http://localhost:5000/reserva", {
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

    let ultimaReserva = response.data[0]["LAST_INSERT_ID()"];
    this.salvarServicos(ultimaReserva, this.arrayServicosEscolhidos);
    return true;
    //return ultimaReserva;
  }

  async criaServicoReservaBD(
    Reservas_idReservas,
    servicos_idservicos,
    nomeServico,
    vlrDiariaServico,
    descricaoServico,
    isSelected
  ) {
    let response = "";
    try {
      response = await axios.post("http://localhost:5000/servicoReserva", {
        Reservas_idReservas,
        servicos_idservicos,
        nomeServico,
        vlrDiariaServico,
        descricaoServico,
        isSelected,
      });
    } catch (err) {
      console.log(err);
    }
    return response;
  }

  async excluiServicosReservaBD(
    Reservas_idReservas,
  ) {
    let response = "";
    console.log("Vou apagar...",Reservas_idReservas)
    try {
      // response = await axios.delete(
      //   `http://localhost:5000/servicoReserva/1`,
      //   {}
      // );
      response = await axios.delete(
        `http://localhost:5000/servicoReserva/${Reservas_idReservas}`,
        {}
      );
    } catch (err) {
      console.log(err);
    }
    return response;
  }

  // async ultimaReservaCriada() {
  //   console.log("ultimaReservaCriada");
  //   let ultimaReserva = "";
  //   try {
  //     ultimaReserva = await axios.get(
  //       `http://localhost:5000/reserva/ultima`,
  //       {}
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return ultimaReserva;
  // }

  async updateReservaBD() {
    if (this.statusReserva === "Cancelada") {
      this.dataCancelamento = new Date().toISOString().substring(0, 10);
    }
    try {
      console.log("update....:",this.idUsuario,this.idAcomodacao)
      await axios.put(`http://localhost:5000/reserva/${this.idReservas}`, {
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
        dataCancelamento: this.dataCancelamento,
        motivoCancelamento: this.motivoCancelamento,
        cupom: this.cupom,
        taxaDescontoCupom: this.taxaDescontoCupom,
        valorTotalDesconto: this.valorTotalDesconto,
        valorTotalServicos: this.valorTotalServicos,
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

  // localiza servico pelo id
  async getReservasById(idReservas) {
    console.log("idReservas = ", idReservas);
    try {
      const response = await axios.get(
        `http://localhost:5000/reserva/${idReservas}`
      );
      this.item = response.data;
      this.idReservas = this.item.idReservas;
      this.dataReserva = new Date(this.item.dataReserva)
        .toISOString()
        .substring(0, 10);
      this.dataEntradaReserva = new Date(this.item.dataEntradaReserva)
        .toISOString()
        .substring(0, 10);
      this.dataSaidaReserva = new Date(this.item.dataSaidaReserva)
        .toISOString()
        .substring(0, 10);
      this.qtdHospedesReserva = this.item.qtdHospedesReserva;
      this.valorReserva = this.item.valorReserva;
      this.idUsuario = this.item.usuario_idUsuario;
      this.nomeUsuario = this.item.nomeUsuario;
      this.idAcomodacao = this.item.acomodacoes_idAcomodacao;
      this.acomodacaoTipo = this.item.nomeAcomodacao;
      this.acomodacaoVlrDiaria = this.item.valorAcomodacao;
      this.statusReserva = this.item.statusReserva;
      this.dataCancelamento = new Date(this.item.dataCancelamento)
        .toISOString()
        .substring(0, 10);
      this.motivoCancelamento = this.item.motivoCancelamento;
      if (this.statusReserva === "Cancelada") {
        this.camposAtivos = true;
        alert("Esta reserva foi cancelada! Edição e exclusão não permitidos!");
      } else {
        this.camposAtivos = false;
      }
      console.log(
        "this.acomodacaoTipo",
        this.statusReserva,
        this.acomodacaoTipo,
        this.acomodacaoVlrDiaria
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}
