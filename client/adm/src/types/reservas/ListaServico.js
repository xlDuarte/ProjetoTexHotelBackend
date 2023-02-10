// ListaServico.js

import { Servicos } from "./Servicos.js";
import { AdmServico } from "./AdmServico.js";

export class ListaServico extends Servicos {
  listagem = [];
  form;
  admServico = new AdmServico();
  constructor(form) {
    super();
    this.form = form;
  }
  criaListagem(inputNumber, inputValor, box, alerta) {
    // console.log(this.salvar(inputNumber, inputValor));
    alerta.classList.add("d-none");
    this.listagem.push(this.salvar(inputNumber, inputValor));

    this.validacao
      ? this.listarItens(this.listagem, box)
      : alerta.classList.remove("d-none");
    alerta.querySelector("p").innerText = "Preencha os campos!";
  }

  listarItens(lista, box) {
    // console.log(this.validacao);
    //console.log("entrei listarItens", lista);
    let divItem;
    lista.forEach((n, i) => {
      // this.listagem.forEach((n, i) => {
      // console.log(n, i);
      divItem = document.createElement("div");
      divItem.setAttribute("class", "boxListagem_item d-flex w-100");
      divItem.id = `box-${i}`;

      for (const item in lista[i]) {
        //console.log(this.listagem[i][item]);
        let div = document.createElement("div");
        div.setAttribute("class", "w-25 border px-3 py-2");
        div.innerText =
          item == "valor" ? `R$ ${lista[i][item]},00` : lista[i][item];
        console.log(item == "id" ? lista[i]["id"] : "false");
        item == "id" ? divItem.setAttribute("data-id", lista[i]["id"]) : null;
        divItem.appendChild(div);
        box.appendChild(divItem);
      }

      let divEdit = document.createElement("div"); // ok
      let btnIconEdit, btnIconRemove; // ok
      divEdit.setAttribute("class", "w-25 border px-3 py-2");

      // icones de edição e lixeira do item
      btnIconEdit = document.createElement("i");
      btnIconEdit.setAttribute("class", "cursor fa-solid fa-pen-to-square");
      // Editar Produto //
      btnIconEdit.onclick = (e) => {
        this.admServico.editarServico(e.target, this.form);
      };

      // Remover Produto //
      btnIconRemove = document.createElement("i");
      btnIconRemove.setAttribute("class", "cursor fa-solid fa-trash-can mx-3");

      btnIconRemove.onclick = (e) => {
        this.admServico.removerServico(e.target);
      };

      // divEdit.innerHTML = `<i class="cursor fa-solid fa-trash-can mx-3"></i> <i class="cursor fa-solid fa-pen-to-square"></i>`;
      divEdit.append(btnIconEdit, btnIconRemove);
      divItem.appendChild(divEdit);
    });

    box.appendChild(divItem);
    this.resetListagem();
  }

  resetListagem() {
    let inputs = this.form.elements;
    //console.log(inputs);
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }
}
