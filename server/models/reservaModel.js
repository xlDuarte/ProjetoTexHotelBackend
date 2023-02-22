// importa o db
import db from "../config/database.js";

// lista todos as reservas
export const getReserva = (result) => {
  // DATE_FORMAT(date,'%d/%m/%Y') AS niceDate
  // db.query("SELECT * FROM Reservas ORDER BY idReservas ASC", (err, results) => {
  db.query(
    "SELECT idReservas, usuario_idUsuario, DATE_FORMAT(dataReserva,'%d/%m/%y') as dataReserva, DATE_FORMAT(dataEntradaReserva,'%d/%m/%y') as dataEntradaReserva,DATE_FORMAT(dataSaidaReserva,'%d/%m/%y') as dataSaidaReserva,qtdHospedesReserva,valorReserva,statusReserva FROM Reservas ORDER BY idReservas ASC",
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

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
};

// insere uma reserva no banco
export const insertReserva = (data, result) => {
  console.log("insertReserva", data);
  db.query("INSERT INTO Reservas SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// atualiza uma reserva no banco
export const updateReservaById = (data, id, result) => {
  console.log("updateReservaById", data);
  db.query(
    "UPDATE Reservas SET dataReserva = ?, dataEntradaReserva = ?, dataSaidaReserva = ?, valorReserva = ?, qtdHospedesReserva = ?, usuario_idUsuario = ?, acomodacoes_idAcomodacao = ?, acomodacaoTipo=?, acomodacaoVlrDiaria = ?, statusReserva = ?, dataCancelamento = ?, motivoCancelamento = ? WHERE idReservas = ?",
    [
      data.dataReserva,
      data.dataEntradaReserva,
      data.dataSaidaReserva,
      data.valorReserva,
      data.qtdHospedesReserva,
      data.idUsuario,
      data.idAcomodacao,
      data.acomodacaoTipo,
      data.acomodacaoVlrDiaria,
      data.statusReserva,
      data.dataCancelamento,
      data.motivoCancelamento,
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
};

// deleta uma reserva no banco
export const deleteReservaById = (id, result) => {
  db.query(
    "DELETE FROM Reservas WHERE idReservas = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
