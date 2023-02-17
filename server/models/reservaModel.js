// importa o db
import db from "../config/database.js";
  
// lista todos as reservas
export const getReserva = (result) => {
    db.query("SELECT * FROM Reservas ORDER BY idReservas ASC", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
// lista uma reserva
export const getReservaById = (id, result) => {
    db.query(
      "SELECT * FROM v_ConsultaReserva WHERE idReservas = ?",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, results[0]);
        }
      }
    );   
}
  
// insere uma reserva no banco
export const insertReserva = (data, result) => {
    console.log("insertReserva", data);
    db.query("INSERT INTO Reservas SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
// atualiza uma reserva no banco
export const updateReservaById = (data, id, result) => {
    db.query(
      "UPDATE Reservas SET dataReserva = ?, dataEntradaReserva = ?, dataSaidaReserva = ?, vlrReserva = ?, qtdHospedesReserva = ?, usuario_idUsuario = ?, acomodacoes_idAcomodacao = ? WHERE idReservas = ?",
      [
        data.nomeServico,
        data.vlrDiariaServico,
        data.descricaoServico,
        data.labelServico,
        id,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );   
}
  
// deleta uma reserva no banco
export const deleteReservaById = (id, result) => {
    db.query("DELETE FROM Reservas WHERE idReservas = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}