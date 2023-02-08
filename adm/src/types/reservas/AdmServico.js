// AdmServicos.js
console.log("Executando AdmServico.js...");

export class AdmServico {
  cadastro;
  boxListagem;

  constructor() {}
  removerServico(e) {
    // remove da div
    console.log("Entrei removerServico", e.parentNode.parentNode);
    this.cadastro = JSON.parse(localStorage.getItem("cadastro"));
    e.parentNode.parentNode.remove();
    let cadastro = JSON.parse(localStorage.getItem("cadastro"));
    console.log(cadastro);
    // remove do array da localStorage
    const item = this.cadastro.findIndex((obj) => {
      return (
        obj.id === parseInt(e.parentNode.parentNode.getAttribute("data-id"))
      );
    });
    this.cadastro.splice(item, 1);
    localStorage.setItem("cadastro", JSON.stringify(this.cadastro));
  }

  editarServico(e, form) {
    this.cadastro = JSON.parse(localStorage.getItem("cadastro"));
    this.boxListagem = e.parentNode.parentNode.querySelectorAll("div");

    for (const child of e.parentNode.parentNode.parentNode.querySelectorAll(
      "div"
    )) {
      child.classList.remove("bg-light");
    }
    e.parentNode.parentNode.classList.add("bg-secondary");

    form.servico.value = this.boxListagem[1].innerText;
    form.vlrDiaria.value = this.boxListagem[2].innerText.substring(
      3,
      this.boxListagem[2].innerText.length - 3
    );
    form.btnEditar.classList.remove("d-none");
    // form.btnEditar.onclick = (el) => {
    //   console.log("Oi - editar", this.boxListagem[1]);
    //   this.boxListagem[1].innerText = form.nome.value;
    //   this.boxListagem[2].innerText = `R$ ${form.vlrDiaria.value},00`;
    //   console.log(e.target);
    //   form.btnEditar.classList.add("d-none");
    //   // ou
    //   //el.target.classList.add("d-none");

    //   // editar localStorage
    //   for (const cad in this.cadastro) {
    //     if (
    //       this.cadastro[cad]["id"] ===
    //       parseInt(e.parentNode.parentNode.getAttribute("data-id"))
    //     ) {
    //       // verdade
    //       this.cadastro[cad]["nome"] = form.nome.value;
    //       this.cadastro[cad]["vlrDiaria"] = form.vlrDiaria.value;
    //     } else {
    //       // falso
    //     }
    //   }
    // localStorage.setItem("cadastro", JSON.stringify(this.cadastro));
  // }
}
}

