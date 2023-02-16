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
  storage = [];

  constructor(id) {
    !id ? (this.id = 0) : (this.id = id);
  }
  salvar(
    inputNome,
    inputLabel,
    inputDescricao,
    inputVlrDiaria,
    itemArrayServicos,
    itemArrayEdit
  ) {
    this.nome = inputNome;
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
        this.id,
        this.nome,
        this.descricao,
        this.label,
        this.vlrDiaria
      );

      // cria 2 arrays - um com o conteudo atual (arrayStorage), do qual o item editado sera primeiro eliminado, para ser recriado no novo array (newStorage)
      // com o BD esta rotina devera ser refeita.
      let arrayStorage,
        newStorage = [];
      if (localStorage.getItem("servicoAdm")) {
        arrayStorage = JSON.parse(localStorage.getItem("servicoAdm"));
      }
      // recupera id do servico antes de excluir...
      this.id = arrayStorage[itemArrayServicos].id;
      // console.log(
      //   `Salvar - check de edição...: elemento array: ${this.itemArrayServicos} - id servico: ${this.id}`
      // );
      arrayStorage.splice(itemArrayServicos, 1);
      newStorage = arrayStorage;
      console.log("Arrays depois de excluir...arrayStorage", arrayStorage);
      let jsonServico = this.lerServico(
        this.id,
        this.nome,
        this.descricao,
        this.label,
        this.vlrDiaria
      );
      newStorage.push(jsonServico);
      localStorage.setItem("servicoAdm", JSON.stringify(newStorage));
      this.itemArrayEdit = false;
      return true;
    }

    // verifica ultimo id para inicializar id a partir do mesmo
    if (localStorage.getItem("servicoAdm")) {
      this.local = JSON.parse(localStorage.getItem("servicoAdm"));
      // verifica se array esta vazio, se tiver conteudo realizar sort para gerar o id correto, se vazio this.local tem que iniciar com 0
      if (this.local.length === 0) {
        this.id = 0;
      } else {
        // realiza sort do array
        this.local = this.listaServicos("id");
        this.id = this.local[this.local.length - 1]["id"] + 1;
      }

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
    this.criaUserBD();
    //console.log(JSON.parse(localStorage.getItem("servicoAdm")));

    // atualiza listagem de itens...
    this.listaServicos("id");
    return this.lerServico();
  }

  async criaUserBD() {
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
      //location.reload(); //testar outras soluções para recarregar o componente
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

  // editarServico(idArray) {
  //   console.log("Vou editar o servico id:", idArray);
  //   // let arrayStorage,
  //   //   newStorage = [];
  //   // if (localStorage.getItem("servicoAdm")) {
  //   //   arrayStorage = JSON.parse(localStorage.getItem("servicoAdm"));
  //   // }
  //   // newStorage = arrayStorage.splice(idArray, 1);
  //   // console.log("Novo Array Storage", newStorage);
  //   // // atualiza localStorage...
  //   // localStorage.setItem("servicoAdm", JSON.stringify(arrayStorage));

  //   return true;
  //}

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

  validarCampos(inputNome, inputDescricao, inputValor) {
    console.log("to validando");
    return inputNome.length < 1 ||
      inputValor.length < 1 ||
      inputDescricao.length < 1
      ? false
      : true;
  }

  listaServicos(ordem) {
    // define conteudo do array de servicos...
    let servicos = [];
    if (localStorage.getItem("servicoAdm")) {
      servicos = JSON.parse(localStorage.getItem("servicoAdm"));
      console.log("servicos sem sort", servicos);
      servicos.sort(this.sortServicos("id"));
      console.log("servicos com sort", servicos, ordem);
    }

    console.log;
    return servicos;
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
