// StorageServico.js
console.log("executando StorageServico.js");

import { ListaServico } from "./ListaServico.js";

export class StorageServico extends ListaServico {
  storage = [];
  form;
  constructor(form) {
    super();
    this.form = form;
  }

  setStorage(inputNome, inputValor, box, div, alerta) {
    if (localStorage.getItem("cadastro")) {
      this.storage = JSON.parse(localStorage.getItem("cadastro"));
      this.storage.push(this.salvar(inputNome, inputValor));
    } else {
      this.storage.push(this.salvar(inputNome, inputValor));
    }
    //localStorage.setItem("cadastro", JSON.stringify(this.storage));

    console.log(this.storage);
    // return this.storage;

    // limpa lista anterior
    const divBox = document.getElementsByClassName(div);
    while (divBox.length > 0) {
      console.log("limpando...", div);
      divBox[0].remove();
    }
    console.log("Storage", this.validacao);
    if (this.validacao) {
      localStorage.setItem("cadastro", JSON.stringify(this.storage));
      this.listarItens(this.storage, box);
    } else {
      alerta.classList.remove("d-none");
      alerta.querySelector("p").innerText = "Preencha os campos!";
    }
    //this.listarItens(this.storage, box);
  }

  getStorage(box) {
    localStorage.getItem("cadastro") === "[]"
      ? localStorage.removeItem("cadastro")
      : null;
    if (localStorage.getItem("cadastro")) {
      this.listarItens(JSON.parse(localStorage.getItem("cadastro")), box);
      let cadastro = JSON.parse(localStorage.getItem("cadastro"));
      console.log(cadastro)
      // !!! Rever esta rotina pois o id correto para exclusão no array deu erro...!!!!
      // for (const cad in cadastro) {
      //  this.boxListagem[cad].querySelector(".fa-trash-can").setAttribute("data-id", cadastro[cad]["id"]);
      // }
    }
  }
}

// const boxListagem = document.getElementsByClassName(".boxListagem_info");
// console.log("getStorage boxListagem", boxListagem.item[0]);
// const divBox = document.getElementsByClassName(".boxListagem");
// console.log("getStorage - boxListagem", divBox.length);
