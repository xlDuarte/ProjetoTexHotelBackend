/* Servicos.js */
// classe Servicos
// para checar na edição...
// > ["a","b","c"].forEach(letra => { letra === "a" ? console.log("Letra",letra) : console.log("erro")})

console.log("Executando Servicos.js");

export const msg = "Teste, Servicos.js";

// import axios
import axios from "axios";

export class Servicos {
  id;
  nome;
  label;
  descricao;
  vlrDiaria;
  itemServico = [];
  storage = [];

  constructor(id) {
    !id ? (this.id = 0) : (this.id = id);
  }
  salvar(
    idServico,
    inputNome,
    inputLabel,
    inputDescricao,
    inputVlrDiaria,
    itemArrayServicos,
    itemArrayEdit
  ) {
    (this.idServico = idServico), (this.nome = inputNome);
    this.label = inputLabel;
    this.descricao = inputDescricao;
    this.vlrDiaria = inputVlrDiaria;
    this.itemArrayServicos = itemArrayServicos;
    this.itemArrayEdit = itemArrayEdit;

    this.lerServico();

    this.validacao = this.validarCampos(
      inputNome,
      inputDescricao,
      inputVlrDiaria
    );
    console.log(
      "Controle de validação e edição:",
      `Validação:${this.validacao} - Edição:${this.itemArrayServicos} - ${this.itemArrayEdit} `
    );
    if (this.validacao !== true) {
      alert("Informações do serviço não estão ok! Verificar!");
      return false;
    }

    // verifica se é uma edição, o tratamento é diferente...
    if (this.itemArrayEdit) {
      console.log(
        "Dados alterados:",
        this.idServico,
        this.nome,
        this.descricao,
        this.label,
        this.vlrDiaria
      );
      this.updateServicoBD();
      this.getServicos();
      this.itemArrayEdit = false;
      return true;
    }

    // grava dados do servico
    this.criaServicoBD();
    // atualiza listagem de itens...
    this.listaServicos("idServicos");
    this.getServicos();
    return true;
  }

  excluir(idServico) {
    this.excluirServicoBD(idServico);
    this.getServicos();
    // força erro para recarregar o grid...verificar motivo!!!
    // this.excluirServicoBD("null");
    // this.getServicos();
    return true;
  }

  async criaServicoBD() {
    console.log("entrei na gravação do registro...");
    try {
      await axios.post("http://localhost:5000/servico", {
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
    return true;
  }

  async updateServicoBD() {
    console.log("entrei no update do servico...");
    try {
      await axios.put(`http://localhost:5000/servico/${this.idServico}`, {
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
    //this.getServicos();
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

  validarCampos(inputNome, inputDescricao, inputValor) {
    console.log("to validando");
    return inputNome.length < 1 ||
      inputValor.length < 1 ||
      inputDescricao.length < 1
      ? false
      : true;
  }

  async listaServicos(ordem) {
    // define conteudo do array de servicos...
    let servicos = [];
    console.log("listaServicos", ordem);
    try {
      const response = await axios.get("http://localhost:5000/servico");
      this.items = response.data;
      servicos = response.data;
      console.log("servicos do listaServicos", servicos);
      return servicos;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  getServicos = async () => {
    try {
      const response = await fetch("http://localhost:5000/servico");
      const data = await response.json();
      console.log("getServicos", data);
      return data;
    } catch (error) {
      console.log("Error getting data", error);
      return Promise.reject(error);
    }
  };

  // localiza servico pelo id
  async getServicosById(idServico) {
    console.log("idServico = ", idServico);
    try {
      const response = await axios.get(
        `http://localhost:5000/servico/${idServico}`
      );
      this.itemServico = response.data;
      console.log("Type Servicos - getServicosById", this.itemServico);
      return response;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  sortServicos(prop) {
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
