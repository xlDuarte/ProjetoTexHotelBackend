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
    arrayServicosBD
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
    this.arrayServicosBD = arrayServicosBD;
    this.servicosEscolhidos = JSON.parse(localStorage.getItem("servicosEscolhidos"));

    console.log(
      "Preparar calculos finais...campos this...:",
      this.qtDiarias,
      this.valorReserva,
      this.acomodacaoVlrDiaria,
      this.qtdHospedesReserva,
      this.taxaDescontoCupom,
      this.valorTotalDesconto,
      this.valorTotalServicos,
      this.arrayServicosBD
    );

    // verifica campos calculados - valorReserva, qtdade diarias, etc
    // rotina para tratar as datas de input
    let dateStartAux, dateEndAux, dateStart, dateEnd;
    dateStartAux = this.dataEntradaReserva.split("-");
    dateStart = new Date(dateStartAux[0], dateStartAux[1] - 1, dateStartAux[2]);
    dateEndAux = this.dataSaidaReserva.split("-");
    dateEnd = new Date(dateEndAux[0], dateEndAux[1] - 1, dateEndAux[2]);
    this.qtDiarias = Math.ceil(dateEnd - dateStart) / (1000 * 60 * 60 * 24);

    // calcula valor da reserva, sem servicos
    this.valorReserva = parseFloat(this.qtDiarias) * parseFloat(this.qtdHospedesReserva) * parseFloat(this.acomodacaoVlrDiaria);
    let vlrServicos = 0;
    // vlrDiarias = this.acomodacaoVlrDiaria * this.qtDiarias * this.qtdHospedesReserva;
    // this.servicosEscolhidos = this.arrayServicosBD;
    console.log("comparando arrays....",this.servicosEscolhidos,this.arrayServicosBD);
    if (this.servicosEscolhidos && Array.isArray(this.servicosEscolhidos)) {
      console.log(
        "Teste Array !!!!! array com servicos existe e é um array",
        this.servicosEscolhidos.length,
        this.servicosEscolhidos[0].idServicos
      );
      for (let i = 0; i < this.servicosEscolhidos.length; i++) {
        if (this.servicosEscolhidos[i].isSelected) {
          vlrServicos =
            vlrServicos +
            this.servicosEscolhidos[i].vlrDiariaServico * this.qtDiarias;
            console.log("Somando serviços...",this.servicosEscolhidos[i].idServicos,this.servicosEscolhidos[i].isSelected,vlrServicos);
        }
      }
    }
    // this.valorReserva = vlrDiarias;
    this.valorTotalServicos = vlrServicos;
    this.valorTotalDesconto = this.valorReserva + vlrServicos;
        console.log(
          "valores...",
          this.valorReserva,
          this.valorTotalServicos,
          this.valorTotalDesconto,
          this.taxaDescontoCupom,this.cupom
        );

    if (this.cupom !== "Sem desconto" && this.cupom !== "")  {
      this.taxaDescontoCupom=10;
      this.valorTotalDesconto =
        this.valorTotalDesconto * (1 - this.taxaDescontoCupom / 100);
    }
    console.log(
      "valores...",
      this.valorReserva,
      this.valorTotalServicos,
      this.valorTotalDesconto
    );

    // limpa dados da localStorage que não serão mais utilizados...
    localStorage.removeItem("servicosEscolhidos");

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
      // para manter compatibilidade com o frontend, dados são persistidos na localStorage tb para o backend antes de serem gravados no banco...
      arrayServ = JSON.parse(localStorage.getItem("servicosEscolhidos"));

      // verifica serviços selecionados e persiste no BD...
      // console.log("Ultima reserva...", idUltimaReserva);
      // console.log("Servicos arrayServ...", arrayServ);

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

  async excluiServicosReservaBD(Reservas_idReservas) {
    let response = "";
    console.log("Vou apagar...", Reservas_idReservas);
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

  async updateReservaBD() {
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

 // localiza servicos da reserva pelo idReserva...rotina está duplicada pois tb existe na store...
 // verifica existencias de resgitros de servicos para a reserva, caso não haja carrega servicos da tabela servicos
//  async getServicosReservaById(idReserva) {
//       try {
//         const response = await axios.get(`http://localhost:5000/servicoReserva/${idReserva}`);
//         console.log("getServicosReservaById idReserva... ", idReserva,response.data);
//         //console.log("getServicosById", this.itemServico);
//         if (isEmptyObject(response.data)) {
//           // le tabela servicos - será a matriz...
//           const responseBD = await axios.get("http://localhost:5000/servico");
//           console.log("Executei getServicosReservaById.js table Servicos...",idReserva,isEmptyObject(responseBD.data),responseBD.data);
//           return responseBD.data;
//         }
//         return response.data;
//       } catch (err) {
//         console.log(err);
//       } 
//   }

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
