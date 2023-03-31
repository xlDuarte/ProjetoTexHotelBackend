/* MainFunctions.js */
// Funções Comuns....

console.log("Executando MainFunctions.js");

export const msg = "Teste, MainFunctions.js";

// import axios
// import axios from "axios";

export function teste() {

  console.log("Teste!!!")

}

// converte datas para facilitar calculo de dias entre datas...
export function dateCalcConv(date) {
  let dateAux = date.split("-");
  let dateConv = new Date(dateAux[0], dateAux[1] - 1, dateAux[2]);
  return dateConv;
}

// retorna valor no formato currency...
export function currencyFormat(strVlr) {
  // Intl.NumberFormat JavaScript has a number formatter (part of the Internationalization API).
  const options = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  };
  const formatter = new Intl.NumberFormat("pt-BR", options);
  return formatter.format(strVlr); /* $2,500.00 */
}

