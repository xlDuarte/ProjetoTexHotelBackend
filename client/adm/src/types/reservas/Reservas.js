/* Reservas.js */
// classe Reservas
// para checar na edição...
// > ["a","b","c"].forEach(letra => { letra === "a" ? console.log("Letra",letra) : console.log("erro")})

// console.log("Executando Reservas.js");
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
    acomodacaoQtMaxPessoas,
    itemArrayReservas,
    itemArrayEdit,
    // arrayServicosBD,
    arrayServicos
  ) {
    // campos input e de controle
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
    this.acomodacaoQtMaxPessoas = acomodacaoQtMaxPessoas;
    this.itemArrayReservas = itemArrayReservas;
    this.itemArrayEdit = itemArrayEdit;
    // this.arrayServicosBD = arrayServicosBD; // excluir
    this.arrayServicos = arrayServicos;
    // console.log(
    //   "Etapa 4 - arrayServicos...",
    //   arrayServicos,
    //   localStorage.getItem("servicosEscolhidos")
    // );
    if (localStorage.getItem("servicosEscolhidos") !== null) {
      this.servicosEscolhidos = JSON.parse(
        localStorage.getItem("servicosEscolhidos")
      );
    } else {
      this.servicosEscolhidos = this.arrayServicos.data;
    }
    // console.log(
    //   "Etapa 4.4 - this.servicosEscolhidos ...",
    //   this.servicosEscolhidos
    // );
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
    let vlrServicos = 0;
    if (this.servicosEscolhidos && Array.isArray(this.servicosEscolhidos)) {
      // console.log(
      //   "Calculando total de servicos...",
      //   this.servicosEscolhidos,
      //   this.servicosEscolhidos.length
      // );
      for (let i = 0; i < this.servicosEscolhidos.length; i++) {

        if (
          this.servicosEscolhidos[i].isSelected === "true" ||
          this.servicosEscolhidos[i].isSelected === true
        ) {
          // console.log(
          //   "Calculo...",
          //   this.servicosEscolhidos[i].nomeServico,
          //   this.servicosEscolhidos[i].isSelected,
          //   this.servicosEscolhidos[i].vlrDiariaServico
          // );
          vlrServicos =
            vlrServicos +
            this.servicosEscolhidos[i].vlrDiariaServico * this.qtDiarias;
        }
      }
    }
    // this.valorReserva = vlrDiarias;
    this.valorTotalServicos = vlrServicos;
    this.valorTotalDesconto = this.valorReserva + vlrServicos;

    if (this.cupom !== "Sem desconto" && this.cupom !== "") {
      this.taxaDescontoCupom = 10;
      this.valorTotalDesconto =
        this.valorTotalDesconto * (1 - this.taxaDescontoCupom / 100);
    }

    // verifica se é uma edição, o tratamento é diferente...
    if (this.itemArrayEdit) {
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
        // limpa dados da localStorage que não serão mais utilizados...
        // localStorage.removeItem("servicosEscolhidos");
      }
      this.itemArrayEdit = false;
      // this.
      //this.getReservas();
      return true;
    }

    // localStorage.removeItem("servicosEscolhidos");
    return this.criaReservaBD();
  }
  // fim rotina persistencia reserva no BD...

  async criaReservaBD() {
    console.log("Etapa 5 - salvando novo registro...");
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
        acomodacaoQtMaxPessoas: this.acomodacaoQtMaxPessoas,
      });
    } catch (err) {
      console.log(err);
    }

    let ultimaReserva = response.data[0]["LAST_INSERT_ID()"];
    this.salvarServicos(ultimaReserva);
    return true;
    //return ultimaReserva;
  }

  // salvarServicos(idUltimaReserva, arrayServicosSelecionados) {
  salvarServicos(idUltimaReserva) {
    console.log(
      "Etapa 6 - verificando serviços LS, Table ReservasServicos ou somente servicos..."
    );
    console.log(
      "Etapa 6.1 - checando arrays...",
      this.arrayServicos,
      this.servicosEscolhidos
    );
    let arrayServ = [];
    // verifica se existem serviços na LS para salvar...para manter compatibilidade com o frontend,
    if (localStorage.getItem("servicosEscolhidos") !== null) {
      arrayServ = JSON.parse(localStorage.getItem("servicosEscolhidos"));
    } else {
      // Ls não existe, então é necessário cadastrar todos os serviços para esta reserva, com idSelected = false...
      // utiliza array arrayServicos do backend ou
      // array do frontend servicosEscolhidos...

      // if (this.arrayServicos.length !== 0) {
      //   // backend
      //   arrayServ = this.arrayServicos;
      // } else {
      //   // frontend
      //   arrayServ = this.servicosEscolhidos;
      // }
      arrayServ = this.arrayServicos;
      console.log("Etapa 6.2 - LS não existe...",this.arrayServicos,this.servicosEscolhidos,arrayServ);
      // arrayServ = this.servicosEscolhidos;
    }
    // verifica serviços selecionados e persiste no BD...
    // console.log("Ultima reserva...", idUltimaReserva);
    // console.log("Servicos arrayServ...", arrayServ);
    for (let i = 0; i < arrayServ.length; i++) {
      // antes só grava os selecionados..ajustado para gravar todos...
      let isSelected = "false";
      console.log(
        "Etapa 6.2 - vou enviar para criar a reserva...arrayServ[i].isSelected",
        arrayServ[i].isSelected
      );
      if (arrayServ[i].isSelected === "true") {
        isSelected = "true";
      }
      let Reservas_idReservas = idUltimaReserva;
      let servicos_idservicos = arrayServ[i].idServicos;
      let nomeServico = arrayServ[i].nomeServico;
      let descricaoServico = arrayServ[i].descricaoServico;
      let vlrDiariaServico = arrayServ[i].vlrDiariaServico;
      console.log(
        "Etapa 6.2 - vou enviar para criar a reserva...",
        Reservas_idReservas,
        servicos_idservicos,
        nomeServico,
        descricaoServico,
        vlrDiariaServico
      );
      this.criaServicoReservaBD(
        Reservas_idReservas,
        servicos_idservicos,
        nomeServico,
        vlrDiariaServico,
        descricaoServico,
        isSelected
      );
      console.log("Etapa 6.3 -  Gravei!");
    }
    localStorage.removeItem("servicosEscolhidos");
  }

  excluir(idReservas) {
    console.log("Rotina excluir()...", idReservas);
    this.excluirReservaBD(idReservas);
    return true;
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
    console.log("Etapa 7 - cria os serviços...");
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

  // async excluiServicosReservaBD(Reservas_idReservas) {
  //   let response = "";
  //   console.log("Vou apagar...", Reservas_idReservas);
  //   try {
  //     // response = await axios.delete(
  //     //   `http://localhost:5000/servicoReserva/1`,
  //     //   {}
  //     // );
  //     response = await axios.delete(
  //       `http://localhost:5000/servicoReserva/${Reservas_idReservas}`,
  //       {}
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return response;
  // }

  async updateReservaBD() {
    console.log("Etapa 5 - update reserva...");
    if (this.statusReserva === "Cancelada") {
      this.dataCancelamento = new Date().toISOString().substring(0, 10);
    }
    try {
      console.log("update....:", this.idUsuario, this.idAcomodacao);
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

  // Lista todas as reservas
  // checar...
  async getReservas() {
    console.log("Reservas.js...getReservas()");
    try {
      const response = await axios.get("http://localhost:5000/reserva");
      this.items = response.data;
      // console.log("getReservas - atualizando itens da lista", this.items);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  // localiza reserva pelo id
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
