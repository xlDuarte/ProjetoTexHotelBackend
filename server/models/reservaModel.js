// importa o db
import db from "../config/database.js";

// lista todos as reservas
export const getReserva = (result) => {
  // DATE_FORMAT(date,'%d/%m/%Y') AS niceDate
  // db.query("SELECT * FROM Reservas ORDER BY idReservas ASC", (err, results) => {
  db.query(
    "SELECT idReservas, usuario_idUsuario, DATE_FORMAT(dataReserva,'%d/%m/%y') as dataReserva, DATE_FORMAT(dataEntradaReserva,'%d/%m/%y') as dataEntradaReserva,DATE_FORMAT(dataSaidaReserva,'%d/%m/%y') as dataSaidaReserva,qtdHospedesReserva,valorReserva,statusReserva,valorTotalDesconto,valorTotalServicos,acomodacaoQtMaxPessoas FROM Reservas ORDER BY idReservas ASC",
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

// lista uma reserva
export const getReservaByUsuarioId = (id, result) => {
  db.query(
    "SELECT * FROM v_ConsultaReserva WHERE usuario_idUsuario = ?",
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

// insere uma reserva no banco
export const insertReserva = (data, result) => {
  console.log("insertReserva", data);
  db.query(
    "INSERT INTO Reservas SET ?",
    [data],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        
          db.query("select LAST_INSERT_ID()", (err, results) => {
            if (err) {
              console.log(err);
              result(err, null);
            } else {
              console.log("Results...",results)
              // localStorage.setItem("ReservaUltimID",JSON.stringify(results))
              result(null, results);
            }
          });
        
        // result(null, results);
      }
    }
  );
};

// retorna ultimo id de reserva criado, necessario para persistir os servicos na sequencia
export const selectUltimoID = (result) => {
  console.log("selectUltimID");
  db.query("select LAST_INSERT_ID()", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

// atualiza uma reserva no banco
export const updateReservaById = (data, id, result) => {
  console.log("updateReservaById", data);
  db.query(
    "UPDATE Reservas SET dataReserva = ?, dataEntradaReserva = ?, dataSaidaReserva = ?, valorReserva = ?, qtdHospedesReserva = ?, usuario_idUsuario = ?, acomodacoes_idAcomodacao = ?, qtDiarias = ?, acomodacaoTipo=?, acomodacaoVlrDiaria = ?, statusReserva = ?, dataCancelamento = ?, motivoCancelamento = ?, cupom = ?, taxaDescontoCupom = ?, valorTotalDesconto = ?, valorTotalServicos = ? WHERE idReservas = ?",
    [
      data.dataReserva,
      data.dataEntradaReserva,
      data.dataSaidaReserva,
      data.valorReserva,
      data.qtdHospedesReserva,
      data.usuario_idUsuario,
      data.acomodacoes_idAcomodacao,
      data.qtDiarias,
      data.acomodacaoTipo,
      data.acomodacaoVlrDiaria,
      data.statusReserva,
      data.dataCancelamento,
      data.motivoCancelamento,
      data.cupom,
      data.taxaDescontoCupom,
      data.valorTotalDesconto,
      data.valorTotalServicos,
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
    "UPDATE Reservas SET statusReserva = 'Excluída' WHERE idReservas = ?",
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
  // db.query(
  //   "DELETE FROM Reservas WHERE idReservas = ?",
  //   [id],
  //   (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       result(err, null);
  //     } else {
  //       result(null, results);
  //     }
  //   }
  // );
};
