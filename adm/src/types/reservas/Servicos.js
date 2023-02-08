/* Servicos.js */
// classe Servicos
console.log("Executando Servicos.js");

export const msg = "Teste, Servicos.js";

export class Servicos {
  id;
  nome;
  label;
  descricao;
  vlrDiaria;
  storage = [];

  constructor(id) {
    !id ? (this.id = 0) : (this.id = id);
  }
  salvar(inputNome, inputLabel, inputDescricao, inputVlrDiaria, novoServico) {
    this.nome = inputNome;
    this.label = inputLabel;
    this.descricao = inputDescricao;
    this.vlrDiaria = inputVlrDiaria;
    this.novoServico = novoServico;
    // console.log(
    //   "Instanciei classe servico. Dados: ",
    //   this.nome,
    //   this.label,
    //   this.descricao,
    //   this.vlrDiaria
    // );
    this.lerServico();
    this.validacao = this.validarCampos(
      inputNome,
      inputDescricao,
      inputVlrDiaria
    );
    console.log(
      "Controle de validação e edição:",
      `Validação:${this.validacao} - Edição:${this.novoServico}`
    );
    if (this.validacao !== true) {
      alert("Informações do serviço não estão ok! Verificar!");
      return false;
    }
    // verifica ultimo id para inicializar id a partir do mesmo
    if (localStorage.getItem("servicoAdm")) {
      this.local = JSON.parse(localStorage.getItem("servicoAdm"));
      this.id = this.local[this.local.length - 1]["id"] + 1;
      console.log("controle do id:", this.id, this.local, this.local.length);
    } else {
      this.validacao ? this.id++ : null;
    }
    //localStorage.setItem("servicoAdm", this.id);

    // prepara gravacao do registro em formato JSON
    // let jsonServico = [
    //   `{id:${this.id},nome:"${this.nome}",descricao:"${this.descricao}",label:"${this.label}",vlrDiaria:${this.vlrDiaria}}`,
    // ];

    let jsonServico = this.lerServico(
      this.id,
      this.nome,
      this.descricao,
      this.label,
      this.vlrDiaria
    );

    // verifica se já existem outros servicos...
    if (localStorage.getItem("servicoAdm")) {
      this.storage = JSON.parse(localStorage.getItem("servicoAdm"));
    }
    this.storage.push(jsonServico);
    //console.log("storage=", this.storage);
    localStorage.setItem("servicoAdm", JSON.stringify(this.storage));
    //console.log(JSON.parse(localStorage.getItem("servicoAdm")));

    // atualiza listagem de itens...
    this.listaServicos("boxListagem_body");
    return this.lerServico();
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
    console.log("Vou exluir o servico id:", idArray);
    let arrayStorage,
      newStorage = [];
    if (localStorage.getItem("servicoAdm")) {
      arrayStorage = JSON.parse(localStorage.getItem("servicoAdm"));
    }
    newStorage = arrayStorage.splice(idArray, 1);
    console.log("Novo Array Storage", newStorage);
    // atualiza localStorage...
    localStorage.setItem("servicoAdm", JSON.stringify(arrayStorage));

    return true;
  }

  validarCampos(inputNome, inputDescricao, inputValor) {
    console.log("to validando");
    return inputNome.length < 1 ||
      inputValor.length < 1 ||
      inputDescricao.length < 1
      ? false
      : true;
  }

  listaServicos(div) {
    // define conteudo do array de servicos...
    let servicos = [];
    if (localStorage.getItem("servicoAdm")) {
      console.log(
        "listaServicos",
        div,
        localStorage.getItem("servicoAdm").length
      );
      servicos = JSON.parse(localStorage.getItem("servicoAdm"));
    }

    console.log;
    return servicos;
  }
}
